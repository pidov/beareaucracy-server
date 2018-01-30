const config = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const LdapStrategy = require('passport-ldapauth')

const { ldap, bearer } = require('./auth/ldap')

passport.use(new LdapStrategy(config.ldap, (user, done) => {
  const extractor = /CN[=]([^,]+)/  // extract cn and set user.groups
  const memberOf = user.memberOf || user.isMemberOf || []
  const returnedUser = {
    groups: (Array.isArray(memberOf) ? memberOf : [memberOf]).map(dn => dn.match(extractor)[1]),
    displayName: user.displayName,
    name: user.name,
    email: user.mail
  }
  done(null, returnedUser)
}))

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

app.use('/login', ldap(passport))
app.use(/^\/(?!login).*/, bearer(passport))

app.listen(config.app.port)
