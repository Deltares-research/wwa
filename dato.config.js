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

const _ = require('lodash')

const includeUnpublished = !!process.env.UNPUBLISHED
const exportScope = process.env.DATO_EXPORT
const contentBasePath = '/narratives'

module.exports = (dato, root, i18n) => {
  switch (exportScope) {
    case 'books':
      generateBooks(dato, root, i18n)
      break
    case 'chapters':
      generateChapters(dato, root, i18n)
      break
    case 'globe':
      generateGlobeMarkers(dato, root, i18n)
      break
    default:
      generateChapters(dato, root, i18n)
      generateBooks(dato, root, i18n)
      generateGlobeMarkers(dato, root, i18n)
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
  const markers = getChapters(dato)
    .reduce((a, b) => a.concat(b), []) // Flat array of chapters
    .map(chapter => {
      delete chapter.pages
      return chapter
    })
  root.createDataFile('static/data/globeMarkers.json', 'json', markers)
}

/**
 * Write out Book JSONs
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateBooks (dato, root, i18n) {
  const books = getBooks(dato)
  books.forEach(book => root.createDataFile(`static/data/books/${book.slug}/index.json`, 'json', book))
  root.createDataFile(`static/data/books/index.json`, 'json', books)
}

/**
 * Write out Chapter JSONs
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateChapters (dato, root, i18n) {
  const chapters = getChapters(dato)
  chapters.forEach(chapter => root.createDataFile(`static/data/books/${chapter.book.slug}/chapters/${chapter.slug}/index.json`, 'json', chapter))
}

/**
 * Get Dato Book entities
 *
 * @param {Dato} dato
 */
function getBooks (dato) {
  return dato.books
    .filter(filterPublished)
    .map(({ entity }) => {
      const { title, slug, chapters } = entity
      const path = `${contentBasePath}/${slug}`
      const chapterEntities = chapters.map(id => {
        const { entity } = dato.find(id)
        const { title, slug, pages, chapterType } = entity
        const chapterPath = `${path}/${slug}`
        let location = null

        // No Array.prototype function, so we can break the loop
        for (const pageId of pages) {
          const page = dato.find(pageId)
          if (page && page.location) {
            location = {
              lat: page.location.latitude,
              lng: page.location.longitude,
              zoom: page.zoomlevel
            }
            break
          }
        }
        return { title, slug, location, path: chapterPath, chapterType }
      })

      // create book
      return {
        title,
        slug,
        path,
        chapters: chapterEntities
      }
    })
}

/**
 * Get Dato Chapter entities
 *
 * @param {Dato} dato
 * @param {DatoObject} [book] optional book to get chapters from
*/
function getChapters (dato, book) {
  const chapters = (book) ? book.chapters : dato.chapters

  return chapters
    .filter(filterPublished)
    .map(chapter => {
      const { title, slug, pages, chapterType } = chapter
      const bookRef = dato.books.filter(book => book.chapters.some(
        bookChapter => bookChapter.id === chapter.id)
      )[0] // get first book of array of books filtered based on reverse lookup
      const book = {
        path: `${contentBasePath}/${bookRef.slug}`,
        slug: bookRef.slug,
        title: bookRef.title
      }
      const path = `${book.path}/${slug}`
      const pagesFormatted = pages.map(page => {
        const location = (page.location) ? {
          lat: page.location.latitude,
          lng: page.location.longitude,
          zoom: page.zoomlevel
        } : null
        return {
          title: page.title,
          slug: page.slug,
          path: `${path}/${page.slug}`,
          location,
          storyteller: {
            name: page.storyteller,
            avatar: page.storytellerAvatar
          },
          images: page.images,
          graphs: page.graphs,
          video: page.video,
          files: page.files,
          links: page.links,
          keywords: page.keywords
        }
      })
      const storyteller = pagesFormatted[0].storyteller
      const location = pagesFormatted.filter(page => page.location)[0].location

      return {
        title,
        slug,
        path,
        location,
        book,
        chapterType,
        storyteller,
        pages: pagesFormatted
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
  return true // return item.published eventually
}
