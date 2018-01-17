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
const exportScope = process.env.DATO_EXPORT

module.exports = (dato, root, i18n) => {
  switch (exportScope) {
    case 'globe':
      generateGlobeMarkers(dato, root, i18n)
      break
    case 'chapters':
      generateChapters(dato, root, i18n)
      break
    default:
      generateGlobeMarkers(dato, root, i18n)
      generateChapters(dato, root, i18n)
  }
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
      const { title, slug, pages, characterPortrait, characterName, chapterType } = entity
      const path = `/chapters/${slug}`
      const chapterTitle = title
      return getPagesByIds(dato, pages).map(entity => {
        entity.path = `${path}/pages/${entity.slug}`
        entity.chapter = `${chapterType}: ${chapterTitle}`
        entity.characterPortrait = characterPortrait
        entity.characterName = characterName
        delete entity.body
        return entity
      })
    }).reduce((a, b) => a.concat(b), []) // Flatten array by reducing to concatenating array
  root.createDataFile('data/globeMarkers.json', 'json', markers)
}

/**
 * Write out JSON file with an array of objects based on pages from DatoCMS
 * Used for the globe visualisation
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateChapters (dato, root, i18n) {
  const chapters = dato.chapters
    .filter(filterPublished)
    .map(({ entity }) => {
      const { title, slug, pages, characterPortrait, characterName, chapterType, influence } = entity
      const path = `/chapters/${slug}`
      const chapterTitle = title
      const pageEntities = getPagesByIds(dato, pages).map(entity => {
        entity.path = `${path}/pages/${entity.slug}`
        entity.chapter = `${chapterType}: ${chapterTitle}`
        entity.characterPortrait = characterPortrait
        entity.characterName = characterName
        return entity
      })
      return {
        title,
        slug,
        path,
        pageEntities,
        influence
      }
    })

  chapters.forEach(chapter => {
    root.createDataFile(`data/chapters/${chapter.slug}.json`, 'json', chapter)
  })
}

/**
 * Get Dato Page entities by array of Ids
 *
 * @param {Dato} dato
 * @param {number[]} pageIds
 * @returns {object[]}
 */
function getPagesByIds (dato, pageIds) {
  return pageIds.map((id) => {
    const { entity } = dato.find(id)
    const { title, slug, location, keywords, theme, mainText } = entity
    return {
      title,
      slug,
      body: mainText,
      location: {
        lat: location.latitude,
        lon: location.longitude
      },
      metadata: {
        keywords,
        theme
      }
    }
  })
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
