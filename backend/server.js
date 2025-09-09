const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference } = require('mercadopago');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Configuração do CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (ex: mobile apps, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Parser JSON
app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Rota para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const { buyerData, productData } = req.body;

    // Validação dos dados recebidos
    if (!buyerData || !buyerData.name || !buyerData.email || !buyerData.phone) {
      return res.status(400).json({ 
        error: 'Dados do comprador incompletos' 
      });
    }

    if (!productData || !productData.title || !productData.price) {
      return res.status(400).json({ 
        error: 'Dados do produto incompletos' 
      });
    }

    // Configuração da preferência
    const preference = new Preference(client);

    console.log('Frontend URL:', process.env.FRONTEND_URL);
    console.log('Notification URL:', process.env.NOTIFICATION_URL);

    const preferenceData = {
      items: [
        {
          id: productData.id || '001',
          title: productData.title,
          description: productData.description || '',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(productData.price)
        }
      ],
      payer: {
        name: buyerData.name,
        email: buyerData.email,
        phone: {
          number: buyerData.phone
        }
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout-success`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout-success`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout-success`
      },
      notification_url: process.env.NOTIFICATION_URL || 'https://webhook.site/unique-url',
      external_reference: `${Date.now()}_${buyerData.email}`, // Referência única
      statement_descriptor: 'INSTITUTO UP'
    };

    // Criar preferência no Mercado Pago
    const result = await preference.create({ body: preferenceData });

    console.log('Preferência criada:', result.id);

    res.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point
    });

  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      details: error.message 
    });
  }
});

// Webhook para receber notificações do Mercado Pago
app.post('/webhook-mercadopago', async (req, res) => {
  try {
    console.log('Webhook recebido:', req.body);

    const { type, data } = req.body;

    // Verificar se é uma notificação de pagamento
    if (type === 'payment') {
      const paymentId = data.id;

      // Buscar detalhes do pagamento
      const paymentResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
          }
        }
      );

      const payment = paymentResponse.data;
      console.log('Status do pagamento:', payment.status);

      // Se o pagamento foi aprovado
      if (payment.status === 'approved') {
        console.log('Pagamento aprovado! Enviando para webhook do Grupo VIP...');

        // Extrair dados do comprador
        const buyerData = {
          name: payment.payer.first_name + ' ' + (payment.payer.last_name || ''),
          email: payment.payer.email,
          phone: payment.payer.phone?.number || '',
          payment_id: payment.id,
          amount: payment.transaction_amount,
          date: new Date().toISOString(),
          external_reference: payment.external_reference
        };

        // Enviar para webhook do n8n (Grupo VIP)
        try {
          await axios.post(process.env.N8N_WEBHOOK_GRUPO_VIP, buyerData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Dados enviados para o webhook do Grupo VIP com sucesso');
        } catch (webhookError) {
          console.error('Erro ao enviar para webhook do Grupo VIP:', webhookError.message);
        }
      }
    }

    // Sempre responder com 200 para confirmar recebimento
    res.status(200).send('OK');

  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(200).send('OK'); // Mesmo com erro, confirma recebimento
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'Instituto UP Backend - Sistema de Pagamentos',
    status: 'Online',
    timestamp: new Date().toISOString()
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`💳 Mercado Pago configurado: ${process.env.MERCADOPAGO_ACCESS_TOKEN ? 'Sim' : 'Não'}`);
});

module.exports = app;
