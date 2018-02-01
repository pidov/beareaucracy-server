const extractBearerFromRequest = ({ headers }) => {
  const { authorization } = headers
  const [ scheme, credentials ] = authorization.split(' ')

  return /^Bearer$/i.test(scheme) && credentials
}

module.exports = async (req, res, next) => {
  const { headers } = req
  const token = extractBearerFromRequest(req)

  if (!token) return ResponseService.json(res, 401, undefined, 'Token not found. Format is Authorization: Bearer [token]')

  if (headers && headers.authorization) {
    JwtService.verify(token, async (err, { id }) => {
      if (err) return ResponseService.json(res, 401, undefined, 'Expired or invalid token')

      const user = await User.findOne({ id })
      req.user = user
      next()
    })
  } else {
    return ResponseService.json(res, 401, undefined, "No authorization header was found");
  }
}
