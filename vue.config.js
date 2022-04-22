module.exports = {
  publicPath: './',
  devServer: {
    port: 8081, // 本机端口号
    host: 'localhost', // 本机主机名
    https: false, // 协议
    open: false, // 启动服务器时自动打开浏览器访问
    proxy: {
      '/api': {
        target: 'http://8.136.156.163:8890/api',
        changOrigin: true, // 开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
