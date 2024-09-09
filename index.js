const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

const port = 3000
app.listen(port)
console.log(`go to http://localhost:${port}`)