import jwt from 'jsonwebtoken'

const PRIVATE_KEY = process.env.PRIVATE_KEY

export default async (req, res) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).end()
  }

  jwt.verify(token, PRIVATE_KEY, (err) => {
    if (err) {
      return res.status(500).send(err).end()
    }
    return res.status(200).end()
  })

  return res.status(401).end()
}
