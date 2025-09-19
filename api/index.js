const express = require('express');
const cors = require('cors');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const axios = require('axios');

const app = express();

// Configuração do CORS para Vercel
app.use(cors({
  origin: true,
  credentials: true
}));

// Parser JSON
app.use(express.json());

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Endpoint de processamento de pagamento (Checkout Transparente via Bricks)
app.post('/api/process_payment', async (req, res) => {
  try {
    const {
      transaction_amount,
      token,
      description,
      installments,
      payment_method_id,
      payer,
      notification_url
    } = req.body;

    if (!transaction_amount || !payer?.email) {
      return res.status(400).json({ error: 'Dados de pagamento incompletos' });
    }

    const method = (payment_method_id || '').toLowerCase();
    const payment = new Payment(client);

    let body = {
      transaction_amount: Number(transaction_amount),
      description,
      payment_method_id: method,
      notification_url: notification_url || process.env.NOTIFICATION_URL,
      payer: {
        email: payer.email,
        first_name: payer.first_name,
        last_name: payer.last_name,
      },
      metadata: {
        source: 'instituto-up-bricks',
        timestamp: Date.now()
      }
    };

    if (method === 'pix' || method.includes('pix')) {
      // PIX não usa token nem installments
    } else if (token) {
      // Cartão
      body.token = token;
      body.installments = installments ? Number(installments) : 1;
      if (payer.identification) {
        body.payer.identification = payer.identification; // { type, number }
      }
    } else if (method === 'bolbradesco' || method.includes('boleto') || method === 'ticket') {
      // Boleto exige identification; se não vier, falhar explicitamente
      if (!payer.identification?.type || !payer.identification?.number) {
        return res.status(400).json({ error: 'Boleto requer CPF/CNPJ em payer.identification' });
      }
      body.payer.identification = payer.identification;
    } else if (!method) {
      return res.status(400).json({ error: 'payment_method_id ausente' });
    }

    const result = await payment.create({ body });
    res.status(201).json(result);
  } catch (error) {
    const details = error?.response?.data || error?.message || error;
    console.error('Erro ao processar pagamento:', details);
    res.status(500).json({ error: 'Erro ao processar pagamento', details });
  }
});

// Rota para criar preferência de pagamento
app.post('/api/create_preference', async (req, res) => {
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

    // Separar nome e sobrenome para melhor apresentação
    const nameParts = buyerData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Processar telefone (extrair código de área se possível)
    const phoneClean = buyerData.phone.replace(/\D/g, '');
    let areaCode = '';
    let phoneNumber = phoneClean;
    
    if (phoneClean.length === 11) {
      areaCode = phoneClean.substring(0, 2);
      phoneNumber = phoneClean.substring(2);
    } else if (phoneClean.length === 10) {
      areaCode = phoneClean.substring(0, 2);
      phoneNumber = phoneClean.substring(2);
    }

    // URL da imagem otimizada para Vercel
    const frontendUrl = process.env.FRONTEND_URL || 'https://instituto-up.vercel.app';
    const imageUrl = `${frontendUrl}/up.png`;

    const preferenceData = {
      items: [
        {
          id: productData.id || '001',
          title: productData.title,
          description: productData.description || 'Curso completo com certificado de participação',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(productData.price),
          picture_url: imageUrl,
          category_id: 'education'
        }
      ],
      payer: {
        name: firstName,
        surname: lastName,
        email: buyerData.email,
        phone: {
          area_code: areaCode,
          number: phoneNumber
        }
      },
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      back_urls: {
        success: `${frontendUrl}/checkout-success`,
        failure: `${frontendUrl}/checkout-success`,
        pending: `${frontendUrl}/checkout-success`
      },
      notification_url: process.env.NOTIFICATION_URL || `${frontendUrl}/api/webhook-mercadopago`,
      external_reference: `${Date.now()}_${buyerData.email}`,
      statement_descriptor: 'INSTITUTO UP',
      binary_mode: false
    };

    // Criar preferência no Mercado Pago
    const result = await preference.create({ body: preferenceData });

    console.log('✅ Preferência criada com sucesso:', result.id);

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
app.post('/api/webhook-mercadopago', async (req, res) => {
  try {
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

      // Se o pagamento foi aprovado
      if (payment.status === 'approved') {
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
        if (process.env.N8N_WEBHOOK_GRUPO_VIP) {
          try {
            await axios.post(process.env.N8N_WEBHOOK_GRUPO_VIP, buyerData);
          } catch (webhookError) {
            console.error('Erro ao enviar para webhook do Grupo VIP:', webhookError.message);
          }
        }
      }
    }

    res.status(200).send('OK');

  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(200).send('OK');
  }
});

// Para Vercel, exportar a app como handler
module.exports = app;
