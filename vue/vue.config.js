'use strict'
const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: false,
  devServer: {
    open: true,
    port: 8081,
    host: '127.0.0.1',
    // 设置代理
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@comp', path.join(__dirname, './src/components'))
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('./src'),
        '@pub': resolve('./public'),
      },
    },
  },
}
