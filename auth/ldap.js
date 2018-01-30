const { encrypt, decrypt } = require('./jwtservice')

const send401 = (msg, req, res, next) => {
  res.set('WWW-Authenticate', 'Basic').status(401).json(msg || {})
  next()
}

module.exports.ldap = (passport) => {
  return (req, res, next) => {
    return passport.authenticate('ldapauth', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return send401(info, req, res, next)
      }

      req.user = user

      return encrypt(user, (err, basic) => {
        if (err) return next(err)
        const reply = info || {}
        reply.token = `JWT ${basic}`
        res.status(200).json(reply)
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
    const authorization = req.get('Authorization')
    const key = authorization ? authorization.match(/JWT\s+([\S]+)$/i) || [] : []
    const token = key[1]
    if (!authorization || !token) {
      return send401(req, res, next)
    }

    return decrypt(token, (err, { token } = {}) => {
      if (err) {
        return (err.name === 'TokenExpiredError') ? send401(req, res, next) : next(err)
      }
      req.user = token
      next()
    })
  }
}
