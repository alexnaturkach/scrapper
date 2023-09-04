const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));


app.get('/scrape', async (req, res) => {
  const scrape = require('./scrape.js')
  res.send({ content: await scrape(req.query.names) });
});

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

