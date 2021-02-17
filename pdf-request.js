const pupLatest = require('puppeteer');
const pup84 = require('puppeteer-chrome-84');

function pdfRequest(request, response) {
  try {
    // hidden Chrome 84 (w/ export tagged pdf flag)
    const pup = request.query.eightyfour && request.query.eightyfour == 'true' ? pup84 : pupLatest
    if (!request.query.html)
      (async () => {
        const browser = await pup.launch({
          args: ['--no-sandbox', '--export-tagged-pdf']
        });
        const url = request.query.page ? decodeURIComponent(request.query.page) : null;
        const urlWithHttps = /(^https?:\/\/)/g.test(url) ? url : 'https://' + url
        const page = await browser.newPage();
        try {
          await page.goto(url ? urlWithHttps : 'https://google.com');
        } catch (e) { response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ ' + e) }
        const options = { format: request.query.size || 'A4', printBackground: typeof request.query.bg != undefined ? request.query.bg == 'true' : true }
        const pdf = await page.pdf(options);
        await browser.close();
        response.type('application/pdf');
        response.send(pdf);
      })();
    else
      (async () => {
        const browser = await pup.launch({
          args: ['--no-sandbox', '--export-tagged-pdf']
        });
        const html = decodeURIComponent(request.query.html);
        const page = await browser.newPage();
        try {
          await page.setContent(html);
        } catch (e) { response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ ' + e) }
        const options = { format: request.query.size || 'A4', printBackground: typeof request.query.bg != undefined ? request.query.bg == 'true' : true }
        const pdf = await page.pdf(options);
        await browser.close();
        response.type('application/pdf');
        response.send(pdf);
      })();
  } catch (e) { response.send('Whoops! Something went wrong, please try again! 🤦‍♂️ ' + e) }
}

module.exports = pdfRequest