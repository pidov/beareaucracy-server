const { sign, verify } = require('./tokenservice')({
  secret: new Date().toString()
})

const { sendJson } = require('../services/response')

module.exports.ldap = passport => (req, res, next) => {
  return passport.authenticate('ldapauth', (err, user, info) => {
    if (err) return next(err)

    if (!user) return sendJson(res, 401, undefined, info.message)

    req.user = user

    sign(user, (err, token) => {
      if (err) return next(err)
      return sendJson(res, 200, { token })
    })
  })(req, res, next)
}

module.exports.bearer = passport => (req, res, next) => {
  const token = req.get('Authorization')

  if (!token) {
    return sendJson(res, 401, undefined, 'Missing authentication credentials.')
  }

  return verify(token, (err, { token } = {}) => {
    if (err) {
      return sendJson(res, 401, undefined, 'Invalid or expired authentication token.')
      // Handle jsonwebtoken errors with json.
      // return (err.name === 'TokenExpiredError') ? send401(req, res, next) : next(err)
    }

    req.user = token
    next()
  })
}
