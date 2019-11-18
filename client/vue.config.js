module.exports = {
  // 选项...
  chainWebpack: config => {
    config
      .devServer
      .proxy({
        '/api': {
          target: 'http://localhost:8089',
          pathRewrite: { '^/api': '' }
        }
      })
  }
}