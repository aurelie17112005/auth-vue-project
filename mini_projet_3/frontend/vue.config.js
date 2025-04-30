const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
// vue.config.js
module.exports = {
  devServer: {
    port: 8081,
    historyApiFallback: true,
    proxy: {
      // redirige /auth et /chat vers ton backend sur 3000
      '^/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '^/chat': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      // nécessaire pour Socket.IO en polling
      '^/socket.io': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
