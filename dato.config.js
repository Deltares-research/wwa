const stringify = require('json-stringify-safe')
const includeUnpublished = !!process.env.UNPUBLISHED

module.exports = (dato, root, i18n) => {
  downloadChapterMarkers(dato, root, i18n)
}

function downloadChapterMarkers (dato, root, i18n) {
  const markers = dato.pages
    .filter(filterPublished)
    .map(({ entity }) => {
      const { title, theme, location, images } = entity
      return {
        title,
        theme,
        images,
        location: {
          lat: location.latitude,
          lon: location.longitude
        }
      }
    })
  root.createDataFile('data/chapterMarkers.json', 'json', markers)
}

function filterPublished (item) {
  if (includeUnpublished) {
    return true
  }
  return item.published
}
