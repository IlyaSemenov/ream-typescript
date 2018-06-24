const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const merge = require('deepmerge')

module.exports = function plugin (options) {
  const loaderOptions = Object.assign({
    appendTsSuffixTo: [/\.vue$/],
    transpileOnly: true
  }, options)

  return {
    name: 'typescript',
    apply (ream) {
      ream.chainWebpack((config, { type }) => {
        config.resolve.extensions.merge(['.js', '.json', '.ts'])
        config.module.rule('js').test(/\.(js|ts)$/).use('ts-loader').after('babel-loader').loader('ts-loader').options(loaderOptions)
        config.module.rule('vue').use('vue-loader').tap(options => merge(options || {}, {
          loaders: {
            ts: {
              loader: 'ts-loader',
              loaderOptions
            }
          }
        }))
        config.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        if (type === 'server') {
          // Only run for server compiler to prevent duplicate errors
          config.plugin('ts-checker').use(ForkTsCheckerPlugin, [{ vue: true }])
        }
      })
    }
  }
}
