# World Water Atlas

<!-- Show build status -->
[![Build Status](https://travis-ci.org/Deltares/wwa.svg?branch=master)](https://travis-ci.org/Deltares/wwa)

## Technologies
* [Nuxt.js](https://nuxtjs.org/guide)
* [DatoCMS](https://docs.datocms.com)

## Connecting to the CMS

Ask a colleague for the API key for read-access or log in to [DatoCMS](https://worldwateratlas.admin.datocms.com/admin/access_tokens), and place this in a `.env` file at the root of this project:
```
DATO_API_TOKEN=<TOKEN>
```

## Deployment

Deployment is documented at the [travis github](https://docs.travis-ci.com/user/deployment/pages/) plugins website.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

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

# build and generate also generates a report in .nuxt/dist/report.html

# deploy to github pages
$ npm run deploy:gh-pages

# deploy to surge (production website)
$ npm run deploy:surge

# Make sure you periodically backup
$ npm run data:backup

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

# Adding geographical data
You can add geographical data by using the following approach

- Prepare a dataset ([geojson](https://tools.ietf.org/html/rfc7946), [kml](https://developers.google.com/kml/documentation/kmlreference), [shape file](http://www.gdal.org/drv_shapefile.html), or pre-rendered [tiff](http://www.gdal.org/frmt_gtiff.html) file in RGBA)
- Upload it to mapbox and do some [styling](https://mapbox.com/studio/styles/)
- You get back a mapbox://style/url
- Add the mapbox://style/url to your story
- Click publish
