import jwt from 'jsonwebtoken'
import auth, { config } from '../../../utils/oauth'
import { withCookies } from '../../../utils/cookieMiddleware'
import { redis } from '../../../services/redis'

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
      const { token } = result
      const {
        domain_prefix,
        access_token,
        expires,
        expires_in,
        refresh_token,
        expires_at,
      } = token

      redis
        .hset(
          `retailer:${domain_prefix}`,
          'domain_prefix',
          domain_prefix,
          'access_token',
          access_token,
          'expires',
          expires,
          'expires_in',
          expires_in,
          'expires_at',
          expires_at,
          'refresh_token',
          refresh_token
        )
        .disconnect()

      const signedToken = jwt.sign(token, PRIVATE_KEY)

      const cookieConfig = {
        sameSite: 'Strict',
        path: '/',
        maxAge: token.expires_in,
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
