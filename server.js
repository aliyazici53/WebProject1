//modules import.
const express = require('express');
const app = express();
const path = require('path');
const puppeteer = require('puppeteer');
const strs = require('./question.js');
const port = 8080;

//loading server.
app.use(express.static('public'));
app.use(express.json());

app.get('/questions', (req, res) => {
    res.json(strs);
})

app.get('/n', (req, res) => {
    res.json({'n' : n});
})  

app.post('/', (req, res) => {
    const {parcel} = req.body;
    let url = "https://translate.google.com/?hl=tr&sl=en&tl=tr&text=" + parcel + "&op=translate";
    scrapeProduct(url);
    }
 )

app.listen(port, () => {
    console.log(`Server has started on port: ${port}`);
});

let n = 0;
//translate question and find the truth, When press 'send' button, this function gonna work.
async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {timeout:0, waitUntil: 'networkidle0'});
    
    const [el] = await page.$x('//*[@id="yDmH0d"]/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[3]/c-wiz[2]/div/div[8]/div/div[1]/span[1]/span/span');
    const src = await el.getProperty('textContent');
    const srcTxt = await src.jsonValue();
    n++;
    app.get('/answer' + n, (req, res) => {
        res.json({'translated': srcTxt});
    });
    browser.close();
}