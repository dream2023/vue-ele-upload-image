module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  css: { extract: false },
  configureWebpack: {
    entry: './example/main.js',
    output: {
      libraryExport: 'default'
    }
  }
}
