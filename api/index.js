const express = require('express');
const path = require('path');
// Carrega variáveis de ambiente no local (não afeta Vercel)
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch {}

// Aceitar certificados auto-assinados do Aiven (deve vir ANTES de qualquer conexão)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Configuração do CORS para Vercel
app.use(cors({
  origin: true,
  credentials: true
}));

// Parser JSON
app.use(express.json());

// ─── Pool PostgreSQL (Aiven) ───────────────────────────────────────────────────
let pool;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
} else {
  console.error('⚠️  DATABASE_URL não configurada!');
}

// Garante que schema + tabela existam no primeiro request
let dbReady = false;
async function ensureTable() {
  if (!pool) throw new Error('DATABASE_URL não configurada. Adicione a env var na Vercel.');
  if (dbReady) return;

  // ── Schema legado ──────────────────────────────────────────────────────────
  await pool.query('CREATE SCHEMA IF NOT EXISTS inscricoes');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inscricoes.inscricoes (
      id               SERIAL PRIMARY KEY,
      client_id        TEXT,
      data_treinamento TEXT,
      step             INTEGER,
      is_final         BOOLEAN DEFAULT FALSE,
      payload          JSONB NOT NULL,
      created_at       TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  const legacyCols = [
    { name: 'client_id',        def: 'TEXT' },
    { name: 'data_treinamento', def: 'TEXT' },
    { name: 'step',             def: 'INTEGER' },
    { name: 'is_final',         def: 'BOOLEAN DEFAULT FALSE' },
    { name: 'payload',          def: 'JSONB' },
    { name: 'created_at',       def: 'TIMESTAMPTZ DEFAULT NOW()' },
  ];
  for (const col of legacyCols) {
    await pool.query(`ALTER TABLE inscricoes.inscricoes ADD COLUMN IF NOT EXISTS ${col.name} ${col.def}`).catch(() => {});
  }

  // ── Schema normalizado (dashboard) ─────────────────────────────────────────
  await pool.query('CREATE SCHEMA IF NOT EXISTS dashboard');

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dashboard.pessoas (
      id                    SERIAL PRIMARY KEY,
      nome                  VARCHAR(255) NOT NULL,
      telefone              VARCHAR(50),
      email                 VARCHAR(255),
      cidade                VARCHAR(100),
      estado                VARCHAR(50),
      profissao             VARCHAR(100),
      origem                VARCHAR(100),
      telefone_normalizado  VARCHAR(20) UNIQUE,
      email_normalizado     VARCHAR(255),
      criado_em             TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em         TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dashboard.treinamentos (
      id          SERIAL PRIMARY KEY,
      codigo      VARCHAR(100) NOT NULL UNIQUE,
      nome        VARCHAR(255) NOT NULL,
      descricao   TEXT,
      data_inicio TIMESTAMPTZ,
      data_fim    TIMESTAMPTZ,
      ativo       BOOLEAN DEFAULT true,
      criado_em   TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS dashboard.inscricoes_v2 (
      id                        SERIAL PRIMARY KEY,
      pessoa_id                 INTEGER NOT NULL REFERENCES dashboard.pessoas(id),
      treinamento_id            INTEGER NOT NULL REFERENCES dashboard.treinamentos(id),
      recrutador_id             INTEGER,
      status                    VARCHAR(20) DEFAULT 'aguardando',
      status_atualizado_em      TIMESTAMPTZ,
      status_whatsapp_contatado BOOLEAN DEFAULT false,
      notas                     JSONB DEFAULT '[]',
      dados_extras              JSONB DEFAULT '{}',
      criado_em                 TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em             TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (pessoa_id, treinamento_id)
    )
  `);

  dbReady = true;
}

// ── Helpers para normalização ────────────────────────────────────────────────
function normalizeTelefone(tel) {
  if (!tel) return null;
  return tel.replace(/\D/g, '').slice(-11); // últimos 11 dígitos
}

function normalizeEmail(email) {
  if (!email) return null;
  return email.toLowerCase().trim();
}

// Upsert pessoa por telefone normalizado
async function upsertPessoa({ nome, telefone, email, cidade, estado, profissao, origem }) {
  const telNorm = normalizeTelefone(telefone);
  const emailNorm = normalizeEmail(email);

  const result = await pool.query(`
    INSERT INTO dashboard.pessoas (nome, telefone, email, cidade, estado, profissao, origem, telefone_normalizado, email_normalizado)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT (telefone_normalizado) DO UPDATE SET
      nome = COALESCE(NULLIF(EXCLUDED.nome, ''), dashboard.pessoas.nome),
      email = COALESCE(NULLIF(EXCLUDED.email, ''), dashboard.pessoas.email),
      email_normalizado = COALESCE(NULLIF(EXCLUDED.email_normalizado, ''), dashboard.pessoas.email_normalizado),
      cidade = COALESCE(NULLIF(EXCLUDED.cidade, ''), dashboard.pessoas.cidade),
      estado = COALESCE(NULLIF(EXCLUDED.estado, ''), dashboard.pessoas.estado),
      profissao = COALESCE(NULLIF(EXCLUDED.profissao, ''), dashboard.pessoas.profissao),
      atualizado_em = NOW()
    RETURNING *
  `, [nome || '', telefone || '', email || '', cidade || '', estado || '', profissao || '', origem || '', telNorm, emailNorm]);

  return result.rows[0];
}

// Garantir que treinamento exista
async function ensureTreinamento(codigo, nome, dataInicio, dataFim) {
  const result = await pool.query(`
    INSERT INTO dashboard.treinamentos (codigo, nome, data_inicio, data_fim)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (codigo) DO UPDATE SET
      nome = EXCLUDED.nome,
      atualizado_em = NOW()
    RETURNING *
  `, [codigo, nome, dataInicio || null, dataFim || null]);

  return result.rows[0];
}

// Criar inscrição v2
async function criarInscricaoV2({ pessoaId, treinamentoId, recrutadorId, dadosExtras }) {
  const result = await pool.query(`
    INSERT INTO dashboard.inscricoes_v2 (pessoa_id, treinamento_id, recrutador_id, dados_extras)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (pessoa_id, treinamento_id) DO UPDATE SET
      dados_extras = EXCLUDED.dados_extras,
      atualizado_em = NOW()
    RETURNING *
  `, [pessoaId, treinamentoId, recrutadorId || null, JSON.stringify(dadosExtras || {})]);

  return result.rows[0];
}

// ── Resolver recrutador por código (traffic_source) ──────────────────────────
async function resolveRecrutador(codigo) {
  if (!codigo) return null;
  try {
    const result = await pool.query(
      'SELECT id FROM dashboard.recrutadores WHERE codigo = $1 AND ativo = true LIMIT 1',
      [codigo]
    );
    return result.rows[0]?.id || null;
  } catch {
    return null; // tabela pode não existir ainda
  }
}

// ─── Endpoint principal: gravar inscrição no banco ─────────────────────────────
app.post('/api/inscricao', async (req, res) => {
  try {
    await ensureTable();

    const body = req.body || {};
    const clientId = body.clientId || null;
    const dataTreinamento = body.data_treinamento || null;
    const step = body._step || null;
    const isFinal = body._final || false;

    // 1) Sempre gravar no schema legado (todas as etapas)
    await pool.query(
      `INSERT INTO inscricoes.inscricoes (client_id, data_treinamento, step, is_final, payload)
       VALUES ($1, $2, $3, $4, $5)`,
      [clientId, dataTreinamento, step, isFinal, JSON.stringify(body)]
    );

    // 2) No submit final, gravar também no schema normalizado (dashboard.*)
    if (isFinal && body.nome && body.telefone) {
      try {
        // Upsert pessoa
        const pessoa = await upsertPessoa({
          nome: body.nome,
          telefone: body.telefone,
          email: body.email || '',
          cidade: body.cidade || '',
          estado: body.estado || '',
          profissao: body.profissao_area || '',
          origem: 'Landing Page UP Day Plus'
        });

        // Garantir treinamento
        const treinamentoCodigo = dataTreinamento || '18 e 19/04';
        const treinamento = await ensureTreinamento(
          treinamentoCodigo,
          `UP Day Plus ${treinamentoCodigo}`,
          null,
          null
        );

        // Resolver recrutador (traffic_source = código do recrutador)
        const recrutadorId = await resolveRecrutador(body.traffic_source || body.utm_source || null);

        // Dados extras (tudo que não é pessoa/treinamento)
        const dadosExtras = {
          idade: body.idade,
          ansiedade: body.ansiedade,
          sono: body.sono,
          vida_financeira: body.vida_financeira,
          saude_fisica: body.saude_fisica,
          relacionamentos_familiares: body.relacionamentos_familiares,
          relacionamento: body.relacionamento,
          areas_melhoria: body.areas_melhoria,
          gatilhos_ansiedade: body.gatilhos_ansiedade,
          sintomas_fisicos: body.sintomas_fisicos,
          sintomas_emocionais: body.sintomas_emocionais,
          tentativas_anteriores: body.tentativas_anteriores,
          como_conheceu: body.como_conheceu,
          comentarios_adicionais: body.comentarios_adicionais,
          utm_source: body.utm_source,
          utm_medium: body.utm_medium,
          utm_campaign: body.utm_campaign,
          origem: 'landing-emocional',
          clientId: clientId,
          timestamp: body.timestamp
        };

        // Criar inscrição v2
        await criarInscricaoV2({
          pessoaId: pessoa.id,
          treinamentoId: treinamento.id,
          recrutadorId,
          dadosExtras
        });

        console.log(`✅ Inscrição FINAL salva (legado + dashboard) — pessoa=${pessoa.id}, client=${clientId}`);
      } catch (normErr) {
        // Se falhar no dashboard, não impede o sucesso (legado já gravou)
        console.error('⚠️ Erro ao gravar no schema dashboard:', normErr.message);
      }
    } else {
      console.log(`✅ Inscrição salva (legado) — step ${step}, final=${isFinal}, client=${clientId}`);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    const details = error?.message || 'Erro desconhecido';
    console.error('Erro ao salvar inscrição:', details);
    res.status(500).json({ error: 'Erro ao salvar inscrição', details });
  }
});

// ─── Compatibilidade com endpoint antigo (/api/n8n-form) ──────────────────────
// Redireciona internamente para a mesma lógica de /api/inscricao
app.post('/api/n8n-form', (req, res, next) => {
  // Reutiliza a lógica do /api/inscricao
  req.url = '/api/inscricao';
  app.handle(req, res, next);
});

// ─── Listar inscrições (uso interno / dashboard) ──────────────────────────────
app.get('/api/inscricoes', async (req, res) => {
  try {
    await ensureTable();

    const treinamento = req.query.treinamento || null;
    const onlyFinal = req.query.final === 'true';

    let query = 'SELECT * FROM inscricoes.inscricoes WHERE 1=1';
    const params = [];

    if (treinamento) {
      params.push(treinamento);
      query += ` AND data_treinamento = $${params.length}`;
    }
    if (onlyFinal) {
      query += ' AND is_final = true';
    }

    query += ' ORDER BY created_at DESC LIMIT 500';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar inscrições:', error.message);
    res.status(500).json({ error: 'Erro ao buscar inscrições', details: error.message });
  }
});

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', db: error.message });
  }
});

// Para Vercel, exportar a app como handler
module.exports = app;

// Execução local: iniciar servidor apenas quando chamado diretamente (node index.js)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
  });
}
