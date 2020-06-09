import oauth2, { config } from '../utils/oauth'

export default (req, res) => {

  /* Generate authorizationURI */
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
  })

  res.writeHead(302, { location: authorizationURI }).send()
}