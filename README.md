# wwa

> World Water Atlas

## Technologies
* [Nuxt.js](https://nuxtjs.org/guide)
* [DatoCMS](https://docs.datocms.com)

## Connecting to the CMS

Ask a colleague for the API key for read-access or log in to [DatoCMS](https://worldwateratlas.admin.datocms.com/admin/access_tokens), and place this in a `.env` file at the root of this project:
```
DATO_API_TOKEN=12300000000bb592578e78628dae95
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

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
