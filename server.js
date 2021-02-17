// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const pup = require('puppeteer');

const pdfRequest = require('./pdf-request');

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

app.get('/pdf', pdfRequest);
//secret bonus feature, use any string to set a default PDF name
app.get(/.*/, pdfRequest);

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
