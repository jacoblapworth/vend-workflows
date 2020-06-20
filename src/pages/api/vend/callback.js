import auth, { config } from '../../../utils/oauth'
import { withCookies } from '../../../utils/cookieMiddleware'
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY

const handler = (req, res) => {
  const code = req.query.code
  const domainPrefix = req.query.domain_prefix

  const tokenConfig = {
    code: code,
    redirect_uri: config.redirect_uri,
    scope: '',
  }

  auth(domainPrefix)
    .getToken(tokenConfig)
    .then((result) => {
      const accessToken = result.token
      const signedToken = jwt.sign(accessToken, PRIVATE_KEY)

      const cookieConfig = {
        sameSite: 'Strict',
        path: '/',
        maxAge: accessToken.expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }

      res.setCookie('token', signedToken, cookieConfig)
      res.statusCode = 302
      res.setHeader('location', '/custom-fields')
      return res.end()
    })
    .catch((error) => {
      console.error(error)
      res.status(error.statusCode || 500)
      res.send({ error })
      return res.end()
    })
}

export default withCookies(handler)
