import { config } from '../_utils/oauth'
import simpleOauth from 'simple-oauth2'

export default (req, res) => {

  const code = req.query.code
  const domainPrefix = req.query.domain_prefix

  const tokenConfig = {
    code: code,
    redirect_uri: config.redirect_uri,
    tokenHost: `https://${domainPrefix}.vendhq.com`,
    tokenPath: `/api/1.0/token`,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  };

  const oauth2 = simpleOauth.create({
    client: {
      id: config.clientId,
      secret: config.clientSecret
    },
    auth: {
      authorizeHost: config.authorizeHost,
      authorizePath: config.authorizePath,
      tokenHost: `https://${domainPrefix}.vendhq.com`,
      tokenPath: config.tokenPath,
    }
  })

  oauth2.authorizationCode.getToken(tokenConfig)
    .then((result) => {

      console.log("Result:", result);

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