const express = require('express');
const path = require('path');
// Carrega variáveis de ambiente no local (não afeta Vercel)
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch {}

const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// ─── Cupons de cortesia do UP Day ────────────────────────────────────────────
// Os códigos nunca ficam no front-end. Cadastre-os na Vercel em
// CUPONS_UP_DAY, usando um item por código (separados por vírgula, ; ou quebra
// de linha):
//   CORTESIA                 -> uso ilimitado, sem validade
//   PARCEIRO:10              -> até 10 usos
//   CORTESIA::2026-08-15     -> uso ilimitado até a data (inclusive)
//   PARCEIRO:10:2026-08-15   -> limite e validade
const COUPON_ENV_VAR = 'CUPONS_UP_DAY';
const COUPON_TRAINING_ID = '3997';
const MAX_COUPON_LENGTH = 40;
const MIN_COUPON_LENGTH = 3;
const COMBINING_MARKS = /[\u0300-\u036f]/g;

function normalizeCouponCode(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toUpperCase()
    .slice(0, MAX_COUPON_LENGTH);
}

function parseCouponCatalog() {
  const catalog = new Map();

  String(process.env[COUPON_ENV_VAR] || '')
    .split(/[,;\n]+/)
    .forEach((entry) => {
      const parts = String(entry || '').split(':');
      const code = normalizeCouponCode(parts[0]);
      if (code.length < MIN_COUPON_LENGTH) return;

      const maxUses = Number.parseInt(String(parts[1] || '').trim(), 10);
      const validUntil = String(parts[2] || '').trim();

      catalog.set(code, {
        code,
        maxUses: Number.isFinite(maxUses) && maxUses > 0 ? maxUses : null,
        validUntil: /^\d{4}-\d{2}-\d{2}$/.test(validUntil) ? validUntil : null,
      });
    });

  return catalog;
}

function isCouponExpired(validUntil) {
  if (!validUntil) return false;
  // A data do cupom vale até 23:59 de Brasília (UTC-3).
  const brasilia = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return brasilia > validUntil;
}

async function countCouponUses(code) {
  if (!pool) return 0;

  const result = await pool.query(
    `SELECT COUNT(*)::int AS total
       FROM inscricoes.inscricoes
      WHERE payload->>'cupom_codigo' = $1
        AND payload->>'cupom_aplicado' = 'true'
        AND payload->>'treinamento_id' = $2`,
    [code, COUPON_TRAINING_ID]
  );
  return Number(result.rows[0]?.total || 0);
}

async function evaluateCoupon(rawCode, options = {}) {
  const codigo = normalizeCouponCode(rawCode);
  const checkUsageLimit = options.checkUsageLimit !== false;

  if (!codigo) {
    return { informado: false, aplicado: false, codigo: '', motivo: '' };
  }

  const coupon = parseCouponCatalog().get(codigo);
  if (!coupon) {
    return { informado: true, aplicado: false, codigo, motivo: 'invalido' };
  }

  if (isCouponExpired(coupon.validUntil)) {
    return { informado: true, aplicado: false, codigo, motivo: 'expirado' };
  }

  if (coupon.maxUses !== null && checkUsageLimit && pool) {
    try {
      if ((await countCouponUses(codigo)) >= coupon.maxUses) {
        return { informado: true, aplicado: false, codigo, motivo: 'esgotado' };
      }
    } catch (error) {
      // Uma falha na contagem não deve negar uma cortesia que é válida.
      console.error('Erro ao contar usos do cupom:', error.message);
    }
  }

  return { informado: true, aplicado: true, codigo, motivo: '' };
}

function applyCouponToPayload(payload, coupon) {
  const nextPayload = { ...(payload || {}) };

  // Esses valores são definidos exclusivamente no servidor. Assim ninguém
  // consegue marcar uma inscrição como cortesia alterando o navegador.
  delete nextPayload.cupom;
  delete nextPayload.tem_cupom;
  delete nextPayload.cupom_informado;
  delete nextPayload.cupom_aplicado;
  delete nextPayload.cupom_codigo;
  delete nextPayload.cupom_status;
  delete nextPayload.checkout_destino;

  nextPayload.cupom_informado = Boolean(coupon.informado);
  nextPayload.cupom_aplicado = Boolean(coupon.aplicado);
  nextPayload.cupom_codigo = coupon.informado ? coupon.codigo : null;
  nextPayload.cupom_status = coupon.informado
    ? (coupon.aplicado ? 'aplicado' : coupon.motivo)
    : 'sem-cupom';
  nextPayload.checkout_destino = coupon.aplicado
    ? 'cortesia-cupom'
    : 'aguardando-link-asaas';

  return nextPayload;
}

// Configuração do CORS para Vercel
app.use(cors({
  origin: true,
  credentials: true
}));

// Parser JSON
app.use(express.json());

function getEnv(name) {
  return process.env[name]?.trim();
}

function buildSslConfig() {
  const sslMode = (getEnv('PGSSLMODE') || getEnv('DB_SSLMODE') || '').toLowerCase();
  const sslEnabled = (getEnv('PGSSL') || getEnv('DB_SSL') || '').toLowerCase();

  if (sslMode === 'disable' || sslEnabled === 'false') return false;
  if (sslMode === 'no-verify' || sslMode === 'require' || sslEnabled === 'true') {
    return { rejectUnauthorized: false };
  }

  return false;
}

function normalizeDatabaseUrl(value) {
  let normalized = String(value || '').trim();

  normalized = normalized.replace(/^export\s+/i, '');
  normalized = normalized.replace(/^DATABASE_URL\s*=\s*/i, '').trim();
  normalized = normalized.replace(/^PGDATABASE_URL\s*=\s*/i, '').trim();

  const quoted = normalized.match(/^["'](.+)["']$/);
  if (quoted) normalized = quoted[1].trim();

  const embeddedUrl = normalized.match(/postgres(?:ql)?:\/\/[^\s"']+/i);
  if (embeddedUrl) normalized = embeddedUrl[0];

  return normalized;
}

function validateDatabaseUrl(databaseUrl) {
  const normalized = normalizeDatabaseUrl(databaseUrl);
  try {
    const parsed = new URL(normalized);
    if (!['postgres:', 'postgresql:'].includes(parsed.protocol)) {
      throw new Error('DATABASE_URL deve comecar com postgres:// ou postgresql://');
    }
    if (!parsed.hostname || parsed.hostname.includes(' ')) {
      throw new Error('DATABASE_URL esta sem host valido');
    }
    if (parsed.hostname.toLowerCase() === 'base') {
      throw new Error('DATABASE_URL esta usando "base" como host; cole a URL PostgreSQL completa do servidor');
    }
    return { parsed, connectionString: normalized };
  } catch (error) {
    throw new Error(`DATABASE_URL invalida: ${error.message}`);
  }
}

function buildPoolConfig() {
  const databaseUrl = getEnv('DATABASE_URL');
  if (databaseUrl) {
    const { parsed, connectionString } = validateDatabaseUrl(databaseUrl);
    const sslMode = parsed.searchParams.get('sslmode')?.toLowerCase();

    return {
      connectionString,
      ssl: sslMode && sslMode !== 'disable'
        ? { rejectUnauthorized: false }
        : buildSslConfig()
    };
  }

  const host = getEnv('PGHOST') || getEnv('DB_HOST');
  const database = getEnv('PGDATABASE') || getEnv('DB_NAME') || getEnv('POSTGRES_DB');
  const user = getEnv('PGUSER') || getEnv('DB_USER') || getEnv('POSTGRES_USER');
  const password = getEnv('PGPASSWORD') || getEnv('DB_PASSWORD') || getEnv('POSTGRES_PASSWORD');
  const port = Number(getEnv('PGPORT') || getEnv('DB_PORT') || 5432);

  if (host && database && user) {
    return {
      host,
      port,
      database,
      user,
      password,
      ssl: buildSslConfig()
    };
  }

  return null;
}

// ─── Pool PostgreSQL ───────────────────────────────────────────────────────────
let pool;
let poolConfigError = null;
try {
  const poolConfig = buildPoolConfig();
  if (poolConfig) {
    pool = new Pool(poolConfig);
  } else {
    poolConfigError = 'Banco nao configurado! Defina DATABASE_URL ou PGHOST/PGDATABASE/PGUSER/PGPASSWORD.';
    console.error(poolConfigError);
  }
} catch (error) {
  poolConfigError = error.message;
  console.error('Erro na configuracao do banco:', poolConfigError);
}

// Garante que schema + tabela existam no primeiro request
let dbReady = false;
async function ensureTable() {
  if (poolConfigError) throw new Error(poolConfigError);
  if (!pool) throw new Error('Banco nao configurado. Defina DATABASE_URL ou PGHOST/PGDATABASE/PGUSER/PGPASSWORD na Vercel.');
  if (dbReady) return;

  // ── Schema legado ──────────────────────────────────────────────────────────
  await pool.query('CREATE SCHEMA IF NOT EXISTS inscricoes');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inscricoes.inscricoes (
      id      SERIAL PRIMARY KEY,
      payload JSONB NOT NULL
    )
  `);

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
      unidade_negocio       VARCHAR(100),
      lead_origem           VARCHAR(100),
      lead_produto          VARCHAR(100),
      telefone_normalizado  VARCHAR(20) UNIQUE,
      email_normalizado     VARCHAR(255),
      criado_em             TIMESTAMPTZ DEFAULT NOW(),
      atualizado_em         TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await pool.query(`
    ALTER TABLE dashboard.pessoas
      ADD COLUMN IF NOT EXISTS unidade_negocio VARCHAR(100),
      ADD COLUMN IF NOT EXISTS lead_origem VARCHAR(100),
      ADD COLUMN IF NOT EXISTS lead_produto VARCHAR(100)
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
async function upsertPessoa({
  nome,
  telefone,
  email,
  cidade,
  estado,
  profissao,
  origem,
  unidadeNegocio,
  leadOrigem,
  leadProduto
}) {
  const telNorm = normalizeTelefone(telefone);
  const emailNorm = normalizeEmail(email);

  const result = await pool.query(`
    INSERT INTO dashboard.pessoas (
      nome,
      telefone,
      email,
      cidade,
      estado,
      profissao,
      origem,
      unidade_negocio,
      lead_origem,
      lead_produto,
      telefone_normalizado,
      email_normalizado
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT (telefone_normalizado) DO UPDATE SET
      nome = COALESCE(NULLIF(EXCLUDED.nome, ''), dashboard.pessoas.nome),
      email = COALESCE(NULLIF(EXCLUDED.email, ''), dashboard.pessoas.email),
      email_normalizado = COALESCE(NULLIF(EXCLUDED.email_normalizado, ''), dashboard.pessoas.email_normalizado),
      cidade = COALESCE(NULLIF(EXCLUDED.cidade, ''), dashboard.pessoas.cidade),
      estado = COALESCE(NULLIF(EXCLUDED.estado, ''), dashboard.pessoas.estado),
      profissao = COALESCE(NULLIF(EXCLUDED.profissao, ''), dashboard.pessoas.profissao),
      origem = COALESCE(NULLIF(EXCLUDED.origem, ''), dashboard.pessoas.origem),
      unidade_negocio = COALESCE(NULLIF(EXCLUDED.unidade_negocio, ''), dashboard.pessoas.unidade_negocio),
      lead_origem = COALESCE(NULLIF(EXCLUDED.lead_origem, ''), dashboard.pessoas.lead_origem),
      lead_produto = COALESCE(NULLIF(EXCLUDED.lead_produto, ''), dashboard.pessoas.lead_produto),
      atualizado_em = NOW()
    RETURNING *
  `, [
    nome || '',
    telefone || '',
    email || '',
    cidade || '',
    estado || '',
    profissao || '',
    origem || '',
    unidadeNegocio || '',
    leadOrigem || '',
    leadProduto || '',
    telNorm,
    emailNorm
  ]);

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
    const incoming = req.body || {};
    const action = String(incoming._action || '').trim();

    if (action === 'validarCupom') {
      const cupom = await evaluateCoupon(incoming.cupom);
      res.status(200).json({ ok: true, cupom });
      return;
    }

    if (action === 'consultarCupom') {
      // A tela de cortesia só confirma um cupom que já foi aplicado na
      // inscrição. Por isso não recontamos o limite de uso nessa etapa.
      const cupom = await evaluateCoupon(incoming.cupom, { checkUsageLimit: false });
      res.status(200).json({ ok: true, cupom });
      return;
    }

    if (action) {
      res.status(400).json({ ok: false, error: 'Ação inválida.' });
      return;
    }

    await ensureTable();

    const cupom = await evaluateCoupon(incoming.cupom);
    const body = applyCouponToPayload(incoming, cupom);
    const clientId = body.clientId || null;
    const treinamentoId = body.treinamento_id || body.training_id || body.treinamento || null;
    const dataTreinamento = body.data_treinamento || null;
    const step = body._step || null;
    const isFinal = body._final || false;
    const leadMeta = {
      unidadeNegocio: body.unidade_negocio || 'InstitutoUP',
      leadSetor: body.lead_setor || 'instituto_up',
      leadOrigem: body.lead_origem || 'up_day_plus',
      leadProduto: body.lead_produto || body.produto_interesse || 'UP Day Plus',
      leadEntrada: body.lead_entrada || body.entrada_sinal || 'InstitutoUP / UP Day Plus'
    };

    // 1) Sempre gravar no schema legado (só a coluna payload que já existe)
    await pool.query(
      `INSERT INTO inscricoes.inscricoes (payload) VALUES ($1::jsonb)`,
      [JSON.stringify(body)]
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
          origem: leadMeta.leadEntrada,
          unidadeNegocio: leadMeta.unidadeNegocio,
          leadOrigem: leadMeta.leadOrigem,
          leadProduto: leadMeta.leadProduto
        });

        // Garantir treinamento
        const treinamentoCodigo = treinamentoId || dataTreinamento || '24/10 e 07/11';
        const treinamentoNome = body.treinamento_nome || `UP Day ${treinamentoCodigo}`;
        const treinamento = await ensureTreinamento(
          treinamentoCodigo,
          treinamentoNome,
          null,
          null
        );

        // Resolver recrutador (traffic_source = código do recrutador)
        const recrutadorId = await resolveRecrutador(body.traffic_source || body.utm_source || null);

        // Dados extras (tudo que não é pessoa/treinamento)
        const dadosExtras = {
          treinamento: body.treinamento,
          treinamento_id: body.treinamento_id,
          training_id: body.training_id,
          treinamento_nome: body.treinamento_nome,
          unidade_negocio: leadMeta.unidadeNegocio,
          lead_setor: leadMeta.leadSetor,
          lead_origem: leadMeta.leadOrigem,
          lead_produto: leadMeta.leadProduto,
          lead_entrada: leadMeta.leadEntrada,
          entrada_sinal: body.entrada_sinal,
          produto_interesse: body.produto_interesse,
          origem_formulario: body.origem_formulario || body.page,
          data_treinamento: body.data_treinamento,
          data_treinamento_extenso: body.data_treinamento_extenso,
          treinamento_inicio: body.treinamento_inicio,
          treinamento_fim: body.treinamento_fim,
          usa_nome_social: body.usa_nome_social,
          nome_social: body.nome_social,
          rg: body.rg,
          cpf: body.cpf,
          endereco: body.endereco,
          data_nascimento: body.data_nascimento,
          estado_civil: body.estado_civil,
          estado_civil_outro: body.estado_civil_outro,
          contato_emergencia: body.contato_emergencia,
          medicamentos_tratamento: body.medicamentos_tratamento,
          indicacao: body.indicacao,
          tamanho_camiseta: body.tamanho_camiseta,
          pagamento_info_visualizada: body.pagamento_info_visualizada,
          cupom_informado: body.cupom_informado,
          cupom_aplicado: body.cupom_aplicado,
          cupom_codigo: body.cupom_codigo,
          cupom_status: body.cupom_status,
          checkout_destino: body.checkout_destino,
          multa_ciente: body.multa_ciente,
          cancelamento_ciente: body.cancelamento_ciente,
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
          utm_term: body.utm_term,
          utm_content: body.utm_content,
          source: body.source,
          traffic_source: body.traffic_source,
          page: body.page,
          referrer: body.referrer,
          dashboard_tags: body.dashboard_tags,
          origem: 'landing-inscricao-outubro-2026',
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

    res.status(200).json({ ok: true, cupom });
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
