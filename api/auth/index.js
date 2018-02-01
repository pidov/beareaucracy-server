const { sign, verify } = require('./tokenservice')({
  secret: new Date().toString()
})

const send401 = (msg, req, res, next) => {
  res.set('WWW-Authenticate', 'Basic').status(401).json(msg || {})
  next()
}

module.exports.ldap = (passport) => {
  return (req, res, next) => {
    console.debug('Ldap middleware', req.body)
    return passport.authenticate('ldapauth', (err, user, info) => {
      console.log(err, user, info)
      if (err) {
        return next(err)
      }

      if (!user) {
        return send401(info, req, res, next)
      }

      req.user = user

      return sign(user, (err, token) => {
        if (err) return next(err)
        res.status(200)
          .json(info || { token })
      })
    })(req, res, next)
  }
}

module.exports.bearer = (passport) => {
  const send401 = (req, res, next) => {
    res.set('WWW-Authenticate', 'Bearer')
      .status(401)
      .json({
        message: 'Login to get a new bearer token'
      })

    next()
  }

  return (req, res, next) => {
    const token = req.get('Authorization')

    if (!token) {
      return send401(req, res, next)
    }

    return verify(token, (err, { token } = {}) => {
      if (err) {
        send401(req, res, next)
        // Handle jsonwebtoken errors with json.
        // return (err.name === 'TokenExpiredError') ? send401(req, res, next) : next(err)
      }
      req.user = token
      next()
    })
  }
}
