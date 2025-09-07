module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: []
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
    config.plugins.delete('eslint');
    config.module.rule('eslint').uses.clear();
  },
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {}
  }
};