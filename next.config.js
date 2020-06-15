const path = require('path')
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
  webpack(config) {
    config.resolve.alias['~'] = path.resolve('./src')
    return config
  },
  env: {
    url: 'https://workflows.now.sh',
  },
})
