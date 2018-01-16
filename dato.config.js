const includeUnpublished = !!process.env.UNPUBLISHED

module.exports = (dato, root, i18n) => {
  downloadGlobeMarkers(dato, root, i18n)
}

function downloadGlobeMarkers (dato, root, i18n) {
  const markers = dato.chapters
    .filter(filterPublished)
    .map(({ entity }) => {
      const { title, pages, characterPortrait, characterName, chapterType } = entity
      const chapterTitle = title

      return pages.map((id) => {
        const { entity } = dato.find(id)
        const { title, location, keywords, theme } = entity
        return {
          title,
          location: {
            lat: location.latitude,
            lon: location.longitude
          },
          metadata: {
            chapter: `${chapterType}: ${chapterTitle}`,
            keywords,
            theme,
            characterPortrait,
            characterName
          }
        }
      })
    }).reduce((a, b) => a.concat(b), []) // Flatten array by reducing to concatenated array
  root.createDataFile('data/globeMarkers.json', 'json', markers)
}

function filterPublished (item) {
  if (includeUnpublished) {
    return true
  }
  return item.published
}
