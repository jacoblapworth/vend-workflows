import oauth2, { config } from '../_utils/oauth'

// /* Do initial auth redirect */
// exports.handler = (event, context, callback) => {
//   /* Generate authorizationURI */
//   const authorizationURI = oauth2.authorizationCode.authorizeURL({
//     redirect_uri: config.redirect_uri,
//     /* State helps mitigate CSRF attacks & Restore the previous state of your app */
//     state: '',
//   })

//   /* Redirect user to authorizationURI */
//   const response = {
//     statusCode: 302,
//     headers: {
//       Location: authorizationURI,
//       'Cache-Control': 'no-cache' // Disable caching of this response
//     },
//     body: '' // return body for local dev
//   }

//   return callback(null, response)
// }


export default (req, res) => {

  /* Generate authorizationURI */
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
  })

  res.writeHead(302, { location: authorizationURI }).send()
}