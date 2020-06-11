import jwt from 'jsonwebtoken'
import axios from 'axios'

const PRIVATE_KEY = process.env.PRIVATE_KEY

const handler = async (req, res) => {

  const { token } = req.cookies
  const decoded = jwt.verify(token, PRIVATE_KEY)

  const vendApi = axios.create({
    baseURL: `https://${decoded.domain_prefix}.vendhq.com/api/`,
    headers: { Authorization: 'Bearer ' + decoded.access_token },
  })

  vendApi.post('graphql', req.body).then((result) => {
    console.log(result.data)
    res.send(result.data)
  })

}

export default handler