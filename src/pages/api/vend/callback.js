import auth, { config } from '../../../utils/oauth'
import cookies from "../../../utils/cookies";
import jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY

const handler = (req, res) => {

  const code = req.query.code
  const domainPrefix = req.query.domain_prefix

  const tokenConfig = {
    code: code,
    redirect_uri: config.redirect_uri,
    scope: '',
  };

  auth(domainPrefix).authorizationCode.getToken(tokenConfig)
    .then((result) => {

      const accessToken = auth(domainPrefix).accessToken.create(result)
      const token = jwt.sign(accessToken.token, PRIVATE_KEY)

      const cookieConfig = {
        sameSite: 'Strict',
        path: '/',
        maxAge: accessToken.token.expires_in,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }

      res.cookie('token', token, cookieConfig)
      res.statusCode = 302
      res.setHeader('location', '/custom-fields')
      res.end()
    })
    .catch((error) => {
      console.error(error)
      return res.status(error.statusCode || 500).send({ error }).end()
    })
}

export default cookies(handler)