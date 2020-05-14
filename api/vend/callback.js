import oauth2, { config } from '../_utils/oauth'

export default (req, res) => {

  const code = req.query.code
  const domainPrefix = req.query.domain_prefix

  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientId,
    client_secret: config.clientSecret
  })
    .then((result) => {
      const token = oauth2.accessToken.create(result)
      console.log('access_token', token.token)
      const accessToken = token.token
      return res.status(200).send(accessToken)
    })
    .catch((error) => {
      console.log('Access Token Error', error.message)
      console.log(error)
      return res.status(error.statusCode || 500).send({
        error: {
          message: error.message,
          error: error.data.payload
        }
      })
    })
}
