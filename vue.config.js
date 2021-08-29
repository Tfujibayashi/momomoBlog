module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  },
  outputDir: 'docs',
  assetsDir: './',
  publicPath: '/momomoBlog/',
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
    }
  }
}
