const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const api = require('./api')

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}

mongoose.connect(config.mongodb.url).then(db => {
  const app = express()

  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  
  app.use('/api', api(config))

  app.listen(config.app.port)
})
.catch(({ message }) => console.log('Failed to initialize database:', message))
