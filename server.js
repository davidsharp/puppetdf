// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const pup = require('puppeteer');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/pdf', function(request, response) {
(async () => {
  const browser = await pup.launch({
      args: ['--no-sandbox']
    });
  const url = request.query.page;
  const urlWithHttps = /(^https?:\/\/)/g.test(url)?url:'https://'+url
  const page = await browser.newPage();
  await page.goto(url?urlWithHttps:'https://google.com');
  const pdf = await page.pdf({format:'A4'});
  await browser.close();
  response.send(pdf);
})();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
