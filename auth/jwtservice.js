const jwt = require('jsonwebtoken')
const config = require('./../config')

const { secret, ttl } = config.jwt

exports.encrypt = (text, done) => {
  jwt.sign({
    token: text
  }, secret, {
    expiresIn: ttl
  }, (err, token) => {
    if (err) {
      return done(err)
    }
    done(undefined, token) // Null instead of undefined
  })
}

exports.decrypt = (text, done) => {
  jwt.verify(text, secret, (err, decoded) => {
    if (err) {
      return done(err)
    } else {
      done(undefined, decoded) // Null instead of undefined
    }
  })
}
