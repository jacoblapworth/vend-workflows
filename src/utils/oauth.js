import auth from 'simple-oauth2'

const domainPrefix = 'secure'

/* process.env.URL from environment variables */
const appUrl = process.env.URL || 'https://workflows.now.sh'

export const config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: process.env.VEND_CLIENT_ID,
  clientSecret: process.env.VEND_CLIENT_SECRET,
  authorizeHost: `https://secure.vendhq.com`,
  authorizePath: `/connect`,
  tokenHost: `https://${domainPrefix}.vendhq.com`,
  tokenPath: `/api/1.0/token`,
  redirect_uri: `${appUrl}/api/vend/callback`,
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set VEND_CLIENT_ID')
  }
  if (!credentials.client.secret) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set VEND_CLIENT_SECRET')
  }
  // return oauth instance
  return auth.create(credentials)
}

export default function authWithDomain(domain = null) {
  return authInstance({
    client: {
      id: config.clientId,
      secret: config.clientSecret
    },
    auth: {
      authorizeHost: config.authorizeHost,
      authorizePath: config.authorizePath,
      tokenHost: domain ? `https://${domain}.vendhq.com` : config.tokenHost,
      tokenPath: config.tokenPath,
    }
  })
}