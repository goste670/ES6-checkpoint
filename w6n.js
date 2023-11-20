const http = require('http');
const htmlparser = require('htmlparser2');

const url = 'http://en.wikipedia.org/wiki/Category:Boulevards_in_Paris';

function makeRequest(url, callback) {
  http.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      callback(null, data);
    });
  }).on('error', (err) => {
    callback(err);
  });
}

function getBoulevardsWithDe(html) {
  const boulevardsWithDe = [];
  let isLink = false;

  const parser = new htmlparser.Parser({
    onopentag(name, attribs) {
      if (name === 'a' && attribs.title) {
        isLink = true;
      }
    },
    ontext(text) {
      if (isLink) {
        boulevardsWithDe.push(text.trim());
      }
    },
    onclosetag(name) {
      if (name === 'a') {
        isLink = false;
      }
    },
    onend() {
      console.table(boulevardsWithDe);
    }
  }, { decodeEntities: true });

  parser.write(html);
  parser.end();
}

makeRequest(url, (err, data) => {
  if (err) {
    console.error('Une erreur s\'est produite :', err.message);
  } else {
    getBoulevardsWithDe(data);
  }
});
