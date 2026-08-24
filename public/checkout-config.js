// =============================================================
// Checkout do UP Day Plus (Instituto UP)
// -------------------------------------------------------------
// Quando receber o link da Asaas, cole-o em `asaasUrl` abaixo e
// publique um novo deploy. Os CÓDIGOS de cupom não ficam aqui:
// eles são validados no servidor pela variável CUPONS_UP_DAY.
// =============================================================
window.UP_DAY_CHECKOUT_CONFIG = {
  // Destino de quem não tem cupom. Deixe vazio até receber o link.
  asaasUrl: '',

  // Opcional: usado apenas para exibir o valor riscado na tela de cortesia.
  // Deixe null enquanto o valor final não estiver definido.
  precoOriginal: null,

  paginaCupom: '/checkout-cupom.html',
  paginaPagamento: '/checkout-pagamento.html',

  // Se houver URL configurada, a tela de pagamento redireciona após esse tempo.
  redirectDelaySeconds: 4,

  whatsappNumber: '551120901412',

  // Contato exibido como alternativa após concluir a inscrição.
  whatsappUrl:
    'https://wa.me/551120901412?text=' +
    encodeURIComponent('Olá! Acabei de concluir minha inscrição do UP Day Plus e gostaria de falar com a equipe.'),
};
