# 🚀 Como Fazer Deploy no Vercel

## 📋 Pré-requisitos

1. **Token do Mercado Pago**: Obter em [developers.mercadopago.com](https://developers.mercadopago.com)
2. **Conta no Vercel**: [vercel.com](https://vercel.com)

## 🔧 Configuração das Variáveis de Ambiente

No dashboard do Vercel, vá em **Settings > Environment Variables** e adicione:

### ✅ Obrigatórias
```
MERCADOPAGO_ACCESS_TOKEN=APP_USR-seu-token-aqui
FRONTEND_URL=https://seu-dominio.vercel.app
```

### 🔄 Opcionais (para automações)
```
N8N_WEBHOOK_GRUPO_VIP=https://seu-n8n.webhook.url/grupo-vip
VITE_N8N_WEBHOOK_REMARKETING=https://seu-n8n.webhook.url/remarketing
NOTIFICATION_URL=https://seu-dominio.vercel.app/api/webhook-mercadopago
```

## 📦 Estrutura do Projeto

```
├── api/                    # Serverless functions para Vercel
│   ├── index.js           # API principal (pagamentos)
│   └── package.json       # Dependencies da API
├── src/                   # Frontend React
├── vercel.json           # Configuração do Vercel
└── package.json          # Dependencies do frontend
```

## 🔄 Deploy Automático

1. **Push para GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Vercel fará deploy automaticamente** quando detectar mudanças no repositório

## 🐛 Problemas Comuns

### ❌ "Cannot resolve module 'mercadopago'"
- **Solução**: Verificar se `api/package.json` existe com as dependencies

### ❌ "CORS Error"
- **Solução**: Verificar se `FRONTEND_URL` está configurada corretamente

### ❌ "Invalid access token"
- **Solução**: Verificar se `MERCADOPAGO_ACCESS_TOKEN` é válido e de produção

## 📊 Como Testar

1. Acesse sua URL do Vercel
2. Preencha o formulário de checkout
3. Verifique se redireciona para o Mercado Pago
4. Complete um pagamento de teste

## 📞 Suporte

Se houver problemas:
1. Verifique os logs no dashboard do Vercel
2. Confirme todas as variáveis de ambiente
3. Teste localmente primeiro com `npm run dev`
