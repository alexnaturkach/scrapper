const express = require('express')
const scrape = require('./scrape.js')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.get('/', async (req, res) => {
  res.send({ content: await scrape()})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

