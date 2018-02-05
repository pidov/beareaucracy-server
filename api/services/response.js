module.exports = {
  sendJson: async (res, status = 200, data, message, meta) => {
    try {
      console.log(message, data, meta)
      return await res.status(status).json({
        message,
        data,
        meta
      })
    } catch (e) {
      console.log("Error sending json: ", e.message)
      return res.status(500).json({})
    }
  }
}
