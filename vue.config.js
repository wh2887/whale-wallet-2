module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/whale-wallet-2-website/'
    : '/',

  lintOnSave: false,
  devServer: {
    disableHostCheck: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null
  },
}
