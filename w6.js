const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris';

async function getBoulevardsWithDe() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const boulevardsWithDe = $('.mw-category a')
      .map((_, element) => $(element).text())
      .get()
      .filter(name => name.includes(' de '));

    console.table(boulevardsWithDe);
  } catch (error) {
    console.error('Une erreur s\'est produite :', error.message);
  }
}

// Appel de la fonction
getBoulevardsWithDe();
