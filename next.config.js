const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  env: {
    strapiServer: "http://localhost:1337",
    secretKey: "AmSRwb8gDhsgCa2LbAta3Psmc47cDC5S"
  }
})
