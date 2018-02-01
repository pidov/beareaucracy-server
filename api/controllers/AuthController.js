const passport = require('passport')

module.exports = {
  authorize (req, res) {
    passport.authenticate('ldapauth', (err, user, info) => {
      if (err || !user) {
        return res.send({
          message: info.message,
          user
        })
      }

      const response = {
        token: JwtService.issue(user)
      }

      return res.send(info || response)
    })(req, res)
  }
}
