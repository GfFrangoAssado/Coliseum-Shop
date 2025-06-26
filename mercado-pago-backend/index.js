const express = require('express');
const mercadopago = require('mercadopago');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: 'APP_USR-8013618126724232-062520-bd2eca4970ed268d2a29b7b7ea28c145-314621968'
});

app.post('/create_preference', async (req, res) => {
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
    res.json({ id: response.body.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar preferência do Mercado Pago." });
  }
});

app.get("/", (req, res) => {
  res.send("Mercado Pago backend está online!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Mercado Pago rodando na porta ${PORT}!`);
});
