const express = require('express')

const bodyParser = require('body-parser');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(express.static('public'));


// app.post('/', async (req, res) => {

//   res.send({ content: await scrape(req.body.names) });
// });

app.get('/scrape', async (req, res) => {
  // res.send({ test: 'success'})
  const scrape = require('./scrape.js')
  res.send({ content: await scrape(req.query.names) });
});

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

