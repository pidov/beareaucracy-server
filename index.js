const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LdapStrategy = require('passport-ldapauth')
const mongoose = require('mongoose')
const cors = require('cors')
const { User } = require('./auth/User')
const { ldap, bearer } = require('./auth')

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}

mongoose.connect(config.mongodb.url).then(db => {
  passport.use(new LdapStrategy(config.ldap, User.upsertLdapUser.bind(User)))

  const app = express()

  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(passport.initialize())

  app.use('/login', ldap(passport))
  app.use(/^\/(?!login).*/, bearer(passport))

  app.listen(config.app.port)
})
.catch(err => console.log('Failed to initialize database', err))
