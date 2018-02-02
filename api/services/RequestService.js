module.exports = {
  getBearer ({ headers = {} }) {
    const { authorization = '' } = headers
    const [ scheme, credentials ] = authorization.split(' ')

    return /^Bearer$/i.test(scheme) && credentials
  }
}
