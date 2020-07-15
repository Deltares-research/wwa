import dotenv from 'dotenv-safe';
import { promises as fs } from 'fs';
import path from 'path';
import fetchContent from './lib/fetch-content';

dotenv.config();

const mapallInternalEventsToRedirects = () => fetchContent(`
  {
    allInternalEvents {
      slug
      countryCode
      nativeLocale
      _allNameLocales {
        locale
      }
    }
  }
`)
  .then(({ allInternalEvents }) => (
    allInternalEvents
      .map((event) => [
        `/events/${event.slug} /${event.nativeLocale}/events/${event.slug} 302 Country=${event.countryCode}`,
        ...event._allNameLocales
          .filter(({ locale }) => locale !== 'en')
          .map(({ locale }) =>
            `/events/${event.slug} /${locale}/events/${event.slug} 302 Language=${locale}`,
          ),
        `/events/${event.slug} /en/events/${event.slug} 302`,
      ])
      .flat()
      .join('\n')
  ));

export default {
  build: {
    extend (config, context) {
      if (context.isDev && context.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }

      config.module.rules.push({
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader',
      });
    },
    extractCSS: true,
    html: {
      // disable minify CSS and JS to improve build times
      // https://www.voorhoede.nl/en/blog/10x-faster-nuxt-builds-on-netlify/
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true,
      },
    },
    postcss: {
      plugins: {
        'postcss-custom-media': {
          importFrom: 'components/core/index.css',
        },
        'postcss-calc': {},
        'postcss-custom-properties': {},
      },
    },
  },
  css: [
    '~/components/core/index.css',
    'typeface-roboto',
  ],
  env: {
    DATO_API_TOKEN: process.env.DATO_API_TOKEN ,
  },
  generate: {
    exclude: [
      /^\/events\/.+/,
      /^\/narratives\/undefined/,
    ],
  },
  hooks: {
    export: {
      done (generator) {
        return mapallInternalEventsToRedirects().then(redirectRules => {
          return fs.writeFile(path.join(generator.distPath, '_redirects'), redirectRules);
        });
      },
    },
  },
  head: {
    title: 'World Water Atlas',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'World Water Atlas' },
    ],
    link: [
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
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    ],
  },
  plugins: [
    { src: '~/plugins/smoothscroll', mode: 'client' },
    { src: '~/plugins/ga.js', mode: 'client' },
    { src: '~/plugins/router-after-each.js', mode: 'client' },
  ],
  target: 'static',
  router: {
    extendRoutes (routes, resolve) {
      const ChapterListOverviewComponent = resolve(__dirname, 'components/chapter-list-overview-page/ChapterListOverviewPage.vue');
      const ChapterListComponent = resolve(__dirname, 'components/chapter-list-page/ChapterListPage.vue');

      const homeRoute = routes.find(route => route.name === 'index');
      homeRoute.alias = '/themes';

      const keywordsRoute = routes.find(route => route.name === 'keywords');
      keywordsRoute.alias = '/keywords/:slug';

      routes.unshift({
        name: `methodologies`,
        path: `/methodologies`,
        component: ChapterListOverviewComponent,
        alias: ['/influences', '/goals', '/narratives'],
      });

      routes.unshift({
        name: 'methodologies-slug',
        path: `/methodologies/:slug`,
        component: ChapterListComponent,
        alias: ['/influences/:slug', '/goals/:slug', '/narratives/:slug', '/themes/:slug'],
      });
    },
  },
};
