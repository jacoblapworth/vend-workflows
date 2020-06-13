import auth, { config } from '../../../utils/oauth'

export default (req, res) => {
  /* Generate authorizationURI */
  const authorizationURI = auth().authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
  })

  res.statusCode = 302
  res.setHeader('location', authorizationURI)
  res.end()
}
