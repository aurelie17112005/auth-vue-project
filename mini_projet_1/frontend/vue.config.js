// vue.config.js
const path = require('path')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new VuetifyPlugin({
        autoImport: true
      })
    ]
  }
}
