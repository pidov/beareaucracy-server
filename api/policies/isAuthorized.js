

module.exports =  function (req, res, next) {
  sails.log.info('Authorizing user.')
  const token = RequestService.getBearer(req)

  if (!token) return ResponseService.json(res, 401, undefined, 'Token not found. Format is Authorization: Bearer [token]')

  JwtService.verify(token, (err, decoded) => {
    if (err) {
      sails.log.error('Couldn\'t verify Bearer token')
      sails.log.debug('Token verification error: ', err)
      return ResponseService.json(res, 401, undefined, 'Expired or invalid token')
    }
    
    User.findOne({ id: decoded.id }).exec((err, user) => {
      if (!user) {
        sails.log.error('Can\'t find user in database. A user with active token was probably deleted.')
        sails.log.debug(err, user)
        return ResponseService.json(res, 401, undefined, 'Expired or invalid token')
      }
      req.user = user
      next()
    })
  })
}
