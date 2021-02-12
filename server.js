// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const pup = require('puppeteer');

let VERSION=null

pup.launch({
      args: ['--no-sandbox']
    }).then(browser=>{
  browser.version().then(version=>{
    VERSION=version
    browser.close()
  })
}) 

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set('view engine', 'ejs')

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  //response.sendFile(__dirname + '/views/index.ejs',{chromium:VERSION});
  response.render('index',{chromium:VERSION})
});

app.get('/pdf', function(request, response) {try{
  if(!request.query.html)
(async () => {
  const browser = await pup.launch({
      args: ['--no-sandbox']
    });
  const url = request.query.page?decodeURIComponent(request.query.page):null;
  const urlWithHttps = /(^https?:\/\/)/g.test(url)?url:'https://'+url
  const page = await browser.newPage();
  try{
   await page.goto(url?urlWithHttps:'https://google.com');
  }catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}
  const options = {format:request.query.size||'A4', printBackground:typeof request.query.bg!=undefined?request.query.bg=='true':true}
  const pdf = await page.pdf(options);
  await browser.close();
  response.type('application/pdf');
  response.send(pdf);
})();
  else
(async () => {
  const browser = await pup.launch({
      args: ['--no-sandbox']
    });
  const html = decodeURIComponent(request.query.html);
  const page = await browser.newPage();
  try{
   await page.setContent(html);
  }catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}
  const options = {format:request.query.size||'A4', printBackground:typeof request.query.bg!=undefined?request.query.bg=='true':true}
  const pdf = await page.pdf(options);
  await browser.close();
  response.type('application/pdf');
  response.send(pdf);
})();
}catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}});

//secret bonus feature, use any string to set a default PDF name
app.get(/.*/, function(request, response) {try{
  if(!request.query.html)
(async () => {
  const browser = await pup.launch({
      args: ['--no-sandbox']
    });
  const url = request.query.page?decodeURIComponent(request.query.page):null;
  const urlWithHttps = /(^https?:\/\/)/g.test(url)?url:'https://'+url
  const page = await browser.newPage();
  try{
   await page.goto(url?urlWithHttps:'https://google.com');
  }catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}
  const options = {format:request.query.size||'A4', printBackground:typeof request.query.bg!=undefined?request.query.bg=='true':true}
  const pdf = await page.pdf(options);
  await browser.close();
  response.type('application/pdf');
  response.send(pdf);
})();
  else
(async () => {
  const browser = await pup.launch({
      args: ['--no-sandbox']
    });
  const html = decodeURIComponent(request.query.html);
  const page = await browser.newPage();
  try{
   await page.setContent(html);
  }catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}
  const options = {format:request.query.size||'A4', printBackground:typeof request.query.bg!=undefined?request.query.bg=='true':true}
  const pdf = await page.pdf(options);
  await browser.close();
  response.type('application/pdf');
  response.send(pdf);
})();
}catch(e){response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ '+e)}});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
