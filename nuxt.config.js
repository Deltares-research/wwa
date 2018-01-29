const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = {}
const plugins = [
  // creat report.html with bundle size
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })
]
const env = {
  // TODO make this a bit more flexible (also allow surge deployment)
  baseURL: 'http://localhost:9020/'
}

// extra options for github pages
if (process.env.DEPLOY_ENV === 'GH_PAGES') {
  routerBase.router = {
    base: '/wwa/'
  }
  plugins.push(
    new UglifyJSPlugin({
      sourceMap: true
    })
  )
  // use the deployment url
  env.baseUrl = 'https://deltares.github.io' + routerBase.router.base
}

module.exports = {
  // Headers of the page
  head: {
    title: 'wwa',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'World Water Atlas' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // include routerbase
  ...routerBase,
  // Build configuration
  build: {
    // Run ESLint on save
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    // Define dynamic routes to generate for dist,
    // TODO: make function based on content from Dato
    generate: {
      routes: [
        '/narratives/slug'
      ]
    },
    // add postcss plugins
    postcss: [
      // require('postcss-custom-properties'),
      require('postcss-calc')
    ],
    plugins: plugins
  },
  env: env
}
