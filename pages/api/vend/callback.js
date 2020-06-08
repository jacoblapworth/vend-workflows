import auth, { config } from '../_utils/oauth'
import jwt from 'jsonwebtoken'

export default (req, res) => {
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
      console.log(accessToken);

      const tokenObject = accessToken.token
      // const token = tokenObject.token

      var token = jwt.sign(tokenObject, 'shhhhh');

      // res.setHeader('Set-Cookie', `workflows:token=${token}`)
      res.statusCode = 302
      res.setHeader('location', '/custom-fields')
      res.end()
    })
    .catch((error) => {
      console.error(error)
      return res.status(error.statusCode || 500).send({ error })
    })
}
