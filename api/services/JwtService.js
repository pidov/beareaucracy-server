const jwt = require('jsonwebtoken')
const jwtSecret = sails.config.secrets.jwtSecret

module.exports = {
  issue: payload => jwt.sign(JSON.parse(JSON.stringify(payload)), jwtSecret, { expiresIn: 24 * 60 * 60 }),
  verify: (token, callback) => jwt.verify(token, jwtSecret, callback)
}
