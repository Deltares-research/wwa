const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// load data to define routes
const books = require('./static/data/books/index.json')
const themes = require('./static/data/themes/index.json')
const goals = require('./static/data/goals/index.json')
const influences = require('./static/data/influences/index.json')
const keywords = require('./static/data/keywords/index.json')
const staticPages = require('./static/data/static-pages/index.json')

const chapters = books
  .reduce((chapters, book) => {
    const bookChapters = book.chapters.map(chapter => {
      chapter.book = { slug: book.slug }
      return chapter
    })
    return chapters.concat(bookChapters)
  }, [])
// Generate routes
const routes = books
  .concat(chapters)
  .concat(themes)
  .concat(goals)
  .concat(influences)
  .concat(keywords)
  .concat(staticPages)
  .map(item => item.path)

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

const env = {
  // Allow to choose a baseurl (should only be used during generate)
  baseUrl: process.env.BASE_URL || 'http://localhost:9920'
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
    script: [
      { src: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.js', defer: true }
    ],
    link: [
      { href: 'https://api.tiles.mapbox.com/mapbox-gl-js/v0.43.0/mapbox-gl.css', rel: 'stylesheet' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
    ]
  },

  plugins: [
    { src: '~/plugins/smoothscroll', ssr: false },
    { src: '~/plugins/vue-portal', ssr: true },
    { src: '~/plugins/ga.js', ssr: false }
  ],

  // include routerbase
  router: {
    base: routerBase.router.base,
    scrollBehavior: (to, from) => {
      if (
        (to.name !== 'themes-theme') &&
        (from.name !== 'themes-theme' || from.name !== 'index')
      ) {
        return { x: 0, y: 0 }
      }
    }
  },
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
  env,
  // Define dynamic routes to generate for dist,
  generate: {
    routes
  }
}
