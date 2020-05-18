# World Water Atlas
Website for action, sharing compelling narratives on water.

## Development

### Quick start
#### Initial setup
```sh
git clone git@github.com:Deltares/wwa.git
cd wwa
npm ci
```

#### Set environment
All needed environment variables are listed in the [.env.example](.env.example) file. To automatically set them fill in a `.env` file following the same structure as the example file.
```sh
cp .env.example .env
```

### Running
#### Development
Fetch content from [DatoCMS](https://datocms.com) and start [Nuxt.js](https://nuxtjs.org/) to preview the website.
```sh
npm run dev
```

#### Production
Fetch content and generate static website files.
```sh
npm run build && npm run generate
```

## Adding geographical data
You can add geographical data by using the following approach

- Prepare a dataset ([geojson](https://tools.ietf.org/html/rfc7946), [kml](https://developers.google.com/kml/documentation/kmlreference), [shape file](http://www.gdal.org/drv_shapefile.html), or pre-rendered [tiff](http://www.gdal.org/frmt_gtiff.html) file in RGBA)
- Upload it to mapbox and do some [styling](https://mapbox.com/studio/styles/)
- You get back a mapbox://style/url
- Add the mapbox://style/url to your story
- Click publish
