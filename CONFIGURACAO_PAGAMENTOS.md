# 🚀 GUIA COMPLETO DE CONFIGURAÇÃO - SISTEMA DE PAGAMENTOS INSTITUTO UP

## ✅ CHECKLIST DE CONFIGURAÇÃO

### 📋 1. CONFIGURAÇÃO DOS WORKFLOWS NO N8N

#### 🎯 Webhook de Remarketing (Captura de Leads)
- [ ] Acesse seu painel do n8n
- [ ] Crie um novo workflow chamado "Remarketing - Instituto UP"
- [ ] Adicione um nó "Webhook" como trigger
- [ ] Configure o webhook para aceitar requisições POST
- [ ] Copie a URL gerada (exemplo: `https://seu-n8n.dominio.com/webhook/remarketing`)
- [ ] Adicione nós para processar os dados recebidos:
  - Nome, Email, Telefone
  - Produto de interesse
  - Timestamp da captura
- [ ] Configure integração com sua ferramenta de email marketing (RD Station, MailChimp, etc.)

#### 🏆 Webhook do Grupo VIP (Pós-Pagamento)
- [ ] Crie um segundo workflow chamado "Grupo VIP - Pagamento Aprovado"
- [ ] Adicione um nó "Webhook" como trigger
- [ ] Configure para aceitar requisições POST
- [ ] Copie a URL gerada (exemplo: `https://seu-n8n.dominio.com/webhook/grupo-vip`)
- [ ] Adicione nós para:
  - Enviar email de boas-vindas
  - Adicionar ao grupo VIP no WhatsApp/Telegram
  - Registrar na planilha/CRM
  - Enviar credenciais de acesso

### 🔑 2. CONFIGURAÇÃO DO MERCADO PAGO

#### Obter Credenciais
- [ ] Acesse https://www.mercadopago.com.br/developers
- [ ] Faça login na sua conta
- [ ] Vá em "Suas integrações" → "Criar aplicação"
- [ ] Escolha "Pagamentos online"
- [ ] Anote o `Access Token` de produção e sandbox

#### Configurar Webhook no Painel
- [ ] No painel do Mercado Pago, vá em "Webhooks"
- [ ] Clique em "Configurar webhook"
- [ ] Configure para o evento "Payments"
- [ ] URL do webhook: `https://SEU-NGROK-URL.ngrok.io/webhook-mercadopago`
- [ ] Salve a configuração

### 🌐 3. CONFIGURAÇÃO DO NGROK (EXPOSIÇÃO LOCAL)

#### Instalação
- [ ] Baixe o ngrok em https://ngrok.com/download
- [ ] Crie uma conta gratuita no ngrok
- [ ] Instale e configure o ngrok:

```bash
# Windows (PowerShell)
# Baixar e extrair o ngrok.exe
# Configurar o token (obtido no site)
./ngrok authtoken SEU_TOKEN_AQUI
```

#### Usar o ngrok
```bash
# Expor a porta 4000 (backend)
./ngrok http 4000
```

- [ ] Anote a URL gerada (exemplo: `https://abc123.ngrok.io`)
- [ ] Esta URL muda a cada reinicialização do ngrok

#### Atualizar Configurações
- [ ] No arquivo `backend/.env`, atualize:
```env
NOTIFICATION_URL=https://SUA-URL-NGROK.ngrok.io/webhook-mercadopago
```

- [ ] No painel do Mercado Pago, atualize a URL do webhook
- [ ] Reinicie o servidor backend após as alterações

### 📁 4. CONFIGURAÇÃO DOS ARQUIVOS .ENV

#### Backend (backend/.env)
```env
# Copie do .env.example e preencha:
MERCADOPAGO_ACCESS_TOKEN=APP_USR-SEU_ACCESS_TOKEN_AQUI
N8N_WEBHOOK_GRUPO_VIP=https://seu-n8n.dominio.com/webhook/grupo-vip
PORT=4000
FRONTEND_URL=http://localhost:5173
NOTIFICATION_URL=https://sua-url-ngrok.ngrok.io/webhook-mercadopago
```

#### Frontend (.env)
```env
# Copie do .env.example e preencha:
VITE_N8N_WEBHOOK_REMARKETING=https://seu-n8n.dominio.com/webhook/remarketing
VITE_BACKEND_URL=http://localhost:4000
```

### 🔧 5. INSTALAÇÃO E EXECUÇÃO

#### Backend
```bash
# Navegue para a pasta backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor
npm start
# ou para desenvolvimento:
npm run dev
```

#### Frontend
```bash
# Na pasta raiz do projeto
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### 🧪 6. TESTES

#### Teste o Backend
- [ ] Acesse http://localhost:4000
- [ ] Deve mostrar: "Instituto UP Backend - Sistema de Pagamentos"

#### Teste o Frontend
- [ ] Acesse http://localhost:5173
- [ ] Clique em "Comprar" em qualquer plano
- [ ] Preencha o formulário de checkout
- [ ] Verifique se redireciona para o Mercado Pago

#### Teste os Webhooks
- [ ] Faça um pagamento de teste no ambiente sandbox
- [ ] Verifique os logs do backend
- [ ] Confirme se os dados chegaram nos webhooks do n8n

### 🚨 7. SOLUÇÃO DE PROBLEMAS COMUNS

#### Erro de CORS
- Verifique se o `FRONTEND_URL` está correto no `.env` do backend

#### Webhook não recebe notificações
- Confirme se o ngrok está rodando
- Verifique se a URL está atualizada no Mercado Pago
- Teste a URL do webhook diretamente

#### Erro 500 no backend
- Verifique se o `MERCADOPAGO_ACCESS_TOKEN` está correto
- Confirme se todas as variáveis do `.env` estão preenchidas

### 📱 8. COMANDOS PARA RODAR TUDO

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

#### Terminal 3 - ngrok
```bash
./ngrok http 4000
```

### 🎯 9. PRÓXIMOS PASSOS

- [ ] Personalizar emails de confirmação
- [ ] Adicionar mais produtos/planos
- [ ] Configurar pagamento em múltiplas parcelas
- [ ] Implementar sistema de cupons de desconto
- [ ] Adicionar analytics e tracking de conversões

### 📞 10. SUPORTE

Se algo não funcionar:
1. Verifique os logs do backend
2. Teste as URLs dos webhooks
3. Confirme as configurações do Mercado Pago
4. Verifique se o ngrok está ativo

---

## 🎉 PRONTO! SEU SISTEMA DE PAGAMENTOS ESTÁ CONFIGURADO!

Agora você tem:
✅ Captura de leads com remarketing
✅ Processamento de pagamentos seguro
✅ Automação pós-venda
✅ Sistema completo funcionando
