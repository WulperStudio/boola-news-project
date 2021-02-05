const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  env: {
    strapiServer: "https://boola-news-admin.herokuapp.com/",
    secretKey: "AmSRwb8gDhsgCa2LbAta3Psmc47cDC5S"
  }
})
