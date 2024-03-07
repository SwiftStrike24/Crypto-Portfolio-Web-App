const axios = require('axios');
const API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

exports.getCryptoPrices = async (req, res) => {
  try {
    const symbols = req.query.symbols.split(','); // Expecting a comma-separated list of symbols
    const prices = {};

    for (const symbol of symbols) {
      const mapResponse = await axios.get(`${API_URL}/map?symbol=${symbol}`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY
        }
      });
      const cryptoId = mapResponse.data.data[0].id;

      const priceResponse = await axios.get(`${API_URL}/quotes/latest?id=${cryptoId}&convert=CAD`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY
        }
      });
      const price = priceResponse.data.data[cryptoId].quote.CAD.price;
      prices[symbol] = price;
    }

    res.json(prices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching crypto prices' });
  }
};
