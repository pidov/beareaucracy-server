module.exports = {
  app: {
    port: process.env.PORT || 5000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'internet without cats',
    ttl: process.env.JWT_TTL || 3600
  },
  ldap: {
    server: {
      url: process.env.LDAP_URL || 'ldap://ldap.forumsys.com:389',
      bindDN: process.env.LDAP_DN || 'cn=read-only-admin,dc=example,dc=com',
      bindCredentials: process.env.LDAP_CREDENTIALS || 'password',
      searchBase: process.env.LDAP_SEARCH_BASE || 'dc=example,dc=com',
      searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
    }
  }
}