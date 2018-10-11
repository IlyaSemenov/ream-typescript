const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const merge = require('deepmerge')

module.exports = function plugin (options) {
  options = merge({
    extensions: ['.js', '.json', '.ts'],
    serverTypeChecks: true,
    clientTypeChecks: false, // By default, skip client type checks to prevent duplicate errors
    tsLoaderOptions: {
      appendTsSuffixTo: [/\.vue$/],
      transpileOnly: true // TODO: in production build, set to false?
    }
  }, options || {})

  return {
    name: 'typescript',
    apply (ream) {
      ream.chainWebpack((config, { type }) => {
        config.resolve.extensions.merge(options.extensions)
        config.module.rule('js').test(/\.(js|ts)$/).use('ts-loader').after('babel-loader').loader('ts-loader').options(options.tsLoaderOptions)
        config.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        if (ream.options.dev && (options.serverTypeChecks && type === 'server' || options.clientTypeChecks && type === 'client')) {
          config.plugin('ts-checker').use(ForkTsCheckerPlugin, [{ vue: true }])
        }
      })
    }
  }
}
