# wwa

> World Water Atlas

## Technologies
* [Nuxt.js](https://nuxtjs.org/guide)
* [DatoCMS](https://docs.datocms.com)

## Connecting to the CMS

Ask a colleague for the API key for read-access or log in to [DatoCMS](https://worldwateratlas.admin.datocms.com/admin/access_tokens), and place this in a `.env` file at the root of this project:
```
DATO_API_TOKEN=<TOKEN>
```

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# build the globe component
$ cd external/globe
$ npm install
$ npm run build

# serve with hot reload at localhost:9920
$ npm run dev


# check sourcecode quality
$ npm run lint

# run tests
$ npm run test

# generate static project
$ npm run generate

# build for production and launch server
$ npm run build
$ npm start

# build and generate also generate a report in .nuxt/dist/report.html

# deploy to github pages
$ npm run generate:gh-pages
$ npm run deploy

# deploy to surge (for intermediate versions/AB testing)
# website will be online at name-wwa-version
$ npm run generate
$ surge -p dist -d name-wwa-version.surge.sh

```



For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
See also the relevant docs
- [Standard](https://standardjs.com/) the style guide for javascript
- [Ava](https://github.com/avajs/ava) the test runner
- [Github pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) github deployment (already setup)
- [Surge](http://surge.sh/) front-end publishing
