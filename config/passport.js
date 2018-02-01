const passport = require('passport')
const LdapStrategy = require('passport-ldapauth')

passport.use(new LdapStrategy({
  server: {
    url: process.env.LDAP_URL || 'ldap://ldap.forumsys.com:389',
    bindDN: process.env.LDAP_DN || 'cn=read-only-admin,dc=example,dc=com',
    bindCredentials: process.env.LDAP_CREDENTIALS || 'password',
    searchBase: process.env.LDAP_SEARCH_BASE || 'dc=example,dc=com',
    searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
  }
}, ({ mail: email }, next) => {
  User.findOrCreate({ email }).exec(next)
}))
