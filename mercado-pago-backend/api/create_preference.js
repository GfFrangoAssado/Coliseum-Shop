const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'APP_USR-8013618126724232-062520-bd2eca4970ed268d2a29b7b7ea28c145-314621968'
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Método não permitido');
    return;
  }
  try {
    const { items } = req.body;
    const preference = {
      items: items,
      back_urls: {
        success: "https://coliseum-shop.netlify.app",
        failure: "https://coliseum-shop.netlify.app",
        pending: "https://coliseum-shop.netlify.app"
      },
      auto_return: "approved"
    };
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar preferência do Mercado Pago." });
  }
};
