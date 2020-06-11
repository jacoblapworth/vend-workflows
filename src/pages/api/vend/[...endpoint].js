import jwt from 'jsonwebtoken'
import axios from 'axios'

const PRIVATE_KEY = process.env.PRIVATE_KEY

const handler = async (req, res) => {

  const { token } = req.cookies
  const decoded = jwt.verify(token, PRIVATE_KEY, function (err, decoded) {
    if (err) {
      console.error(err);
      res.statusCode = 500
      return res.send(err)
    }
    return decoded
  });

  const vendApi = axios.create({
    baseURL: `https://${decoded.domain_prefix}.vendhq.com/api/`,
    headers: { Authorization: 'Bearer ' + decoded.access_token },
  })

  const {
    query: { endpoint },
  } = req

  const url = endpoint.join('/')

  console.log(req.body);


  await vendApi({
    method: req.method,
    url: url,
    data: req.body
  })
    .then(result => res.send(result.data.data))
    .catch(error => {
      console.error(error.response);
      res.statusCode = error.response.status || 500
      res.send(error.response.data)
    })

}

export default handler