module.exports = {
  json: async (res, status = 200, data, message, meta) => {
    try {
      return await res.status(status).json({ message, data, meta })
    } catch (e) {
      sails.log.debug(e.message)
      sails.log.debug( res)
      return {message: 'Unexpected error occured'}
      return res.status(500).send()
    }
  }
}
