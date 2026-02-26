const express = require('express');
const path = require('path');
// Carrega variáveis de ambiente no local (não afeta Vercel)
try {
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
} catch {}
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
// Remove sslmode da connection string para evitar conflito com pg driver
const rawUrl = process.env.DATABASE_URL || '';
const dbUrl = rawUrl.replace(/[?&]sslmode=[^&]*/gi, '');

let pool;
if (dbUrl) {
  pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  });
} else {
  console.error('⚠️  DATABASE_URL não configurada!');
}

// Garante que schema + tabela existam no primeiro request
let dbReady = false;
async function ensureTable() {
  if (!pool) throw new Error('DATABASE_URL não configurada. Adicione a env var na Vercel.');
  if (dbReady) return;
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
  dbReady = true;
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

    await pool.query(
      `INSERT INTO inscricoes.inscricoes (client_id, data_treinamento, step, is_final, payload)
       VALUES ($1, $2, $3, $4, $5)`,
      [clientId, dataTreinamento, step, isFinal, JSON.stringify(body)]
    );

    console.log(`✅ Inscrição salva — step ${step}, final=${isFinal}, client=${clientId}`);
    res.status(200).json({ ok: true });
  } catch (error) {
    const details = error?.message || 'Erro desconhecido';
    console.error('Erro ao salvar inscrição:', details);
    res.status(500).json({ error: 'Erro ao salvar inscrição', details });
  }
});

// ─── Manter compatibilidade com endpoint antigo (/api/n8n-form) ────────────────
// Redireciona para o novo endpoint de inscrição no banco
app.post('/api/n8n-form', async (req, res) => {
  try {
    await ensureTable();

    const body = req.body || {};
    const clientId = body.clientId || null;
    const dataTreinamento = body.data_treinamento || null;
    const step = body._step || null;
    const isFinal = body._final || false;

    await pool.query(
      `INSERT INTO inscricoes.inscricoes (client_id, data_treinamento, step, is_final, payload)
       VALUES ($1, $2, $3, $4, $5)`,
      [clientId, dataTreinamento, step, isFinal, JSON.stringify(body)]
    );

    console.log(`✅ [n8n-form compat] Inscrição salva — step ${step}, final=${isFinal}`);
    res.status(200).json({ ok: true });
  } catch (error) {
    const details = error?.message || 'Erro desconhecido';
    console.error('Erro ao salvar inscrição:', details);
    res.status(500).json({ error: 'Erro ao salvar inscrição', details });
  }
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
