import { serialize } from 'cookie'

/**
 * This sets `cookie` on `res` object
 */
const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */
export const withCookies = (handler) => (req, res) => {
  res.setCookie = (name, value, options) => setCookie(res, name, value, options)

  return handler(req, res)
}

export default withCookies
