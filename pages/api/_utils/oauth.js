import simpleOauth from 'simple-oauth2'

const vendApi = 'https://secure.vendhq.com/connect'
const domain = 'secure'

/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || 'http://localhost:3000'

export const config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: process.env.VEND_CLIENT_ID,
  clientSecret: process.env.VEND_CLIENT_SECRET,
  /* Intercom oauth API endpoints */

  authorizeHost: `https://secure.vendhq.com`,
  authorizePath: `/connect`,
  tokenHost: `https://${domain}.vendhq.com`,
  tokenPath: `/api/1.0/token`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${siteUrl}/api/vend/callback`,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set VEND_CLIENT_ID')
  }
  if (!credentials.client.secret) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set VEND_CLIENT_SECRET')
  }
  // return oauth instance
  return simpleOauth.create(credentials)
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    authorizeHost: config.authorizeHost,
    authorizePath: config.authorizePath,
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
  }
})
