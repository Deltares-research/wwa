/**
 * @typedef Dato
 * @type {object} - DatoCMS API object
 */

/**
 * @typedef Root
 * @type {object} - Dato Filesystem API
 */

/**
 * @typedef i18n
 * @type {object}
 * @property {string} locale - Current language in ISO 639-1
 * @property {string[]} availableLocales - Available languages in ISO 639-1
 */

const includeUnpublished = !!process.env.UNPUBLISHED

module.exports = (dato, root, i18n) => {
  generateGlobeMarkers(dato, root, i18n)
}

/**
 * Write out JSON file with an array of objects based on pages from DatoCMS
 * Used for the globe visualisation
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateGlobeMarkers (dato, root, i18n) {
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
    }).reduce((a, b) => a.concat(b), []) // Flatten array by reducing to concatenating array
  root.createDataFile('data/globeMarkers.json', 'json', markers)
}

/**
 * filter item based on published flag,
 * or override when UNPUBLISHED is set.
 *
 * @param {DatoRecord} item
 * @returns {DatoRecord}
 */
function filterPublished (item) {
  if (includeUnpublished) {
    return true
  }
  return item.published
}
