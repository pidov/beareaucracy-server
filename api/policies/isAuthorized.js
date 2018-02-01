module.exports = (req, res, next) => {
  let token
  const { headers } = req
  if (headers && headers.authorization) {
    try {
      const [scheme, credentials] = headers.authorization.split(' ')

      if (/^Bearer$/i.test(scheme)) {
        token = credentials
      }
    } catch (e) {
      console.log(e)
      return ResponseService.json(401, res, 'Format is Authorization: Bearer [token]')
    }

    JwtService.verify(token, (err, decoded) => {
      if (err) return ResponseService.json(401, res, 'Expired or invalid token')
      Users.findOne({ id: decoded.id }).then(user => {
        req.currentUser = user
        next()
      })
    })
  } else {
    return ResponseService.json(401, res, "No authorization header was found");
  }
}
