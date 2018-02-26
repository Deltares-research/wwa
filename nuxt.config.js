const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// env settings
const env = {}
if (process.env.BASE_URL) {
  env.baseUrl = process.env.BASE_URL
} else {
  env.baseUrl = 'http://localhost:9920'
}

// load data to define routes
const books = require('./static/data/books/index.json')
const chapters = books
  .reduce((chapters, book) => {
    const bookChapters = book.chapters.map(chapter => {
      chapter.book = { slug: book.slug }
      return chapter
    })
    return chapters.concat(bookChapters)
  }, [])
// Generate routes
const routes = books.concat(chapters)
  .map(item => item.path)
  .concat([
    '/influences/people',
    '/influences/planet',
    '/influences/prosperity',
    '/influences/peace',
    '/influences/partnership',
    '/about'
  ])
// TODO: We want to enable these, but they give an error. They end up as null in the final config.
const postcss = {
  plugins: {
    'postcss-import': {},
    'postcss-calc': {},
    'postcss-custom-properties': {
      // TODO: check warnings about variables declared outside :root
      warnings: false
    }
  }
}

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = {
  router: {
    base: '/'
  }
}
const plugins = [
  // creat report.html with bundle size
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  })
]

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
  plugins.push(
    new CopyWebpackPlugin([{
      from: 'static/.nojekyll',
      to: 'dist/.nojekyll'
    }], {})
  )
}

module.exports = {
  // Css entry file
  css: [
    'normalize.css',
    '~/base.css'
  ],
  head: {
    title: 'World Water Atlas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'World Water Atlas' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // include routerbase
  router: routerBase.router,
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

      config.module.rules.push({
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      })
    },
    // Create separate css file
    extractCSS: true,
    // add postcss plugins
    postcss,
    plugins
  },
  env: env,
  // Define dynamic routes to generate for dist,
  generate: {
    routes
  }
}
