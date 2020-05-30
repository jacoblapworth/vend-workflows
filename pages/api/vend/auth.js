import auth, { config } from '../_utils/oauth'

export default (req, res) => {

  /* Generate authorizationURI */
  const authorizationURI = auth().authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
  })

  res.writeHead(302, { location: authorizationURI }).send()
}