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
    case 'books':
      generateBooks(dato, root, i18n)
      break
    default:
      generateGlobeMarkers(dato, root, i18n)
      generateBooks(dato, root, i18n)
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
  const books = getBooks(dato)
  const markers = books.map(book => getChaptersFromBook(dato, book))
    .reduce((a, b) => a.concat(b), []) // Flat array of chapters
    .map(({ pages }) => {
      return pages.map(PageEntity => {
        delete PageEntity.body
        return PageEntity
      })
    }).reduce((a, b) => a.concat(b), []) // Flat array of pages
  root.createDataFile('static/data/globeMarkers.json', 'json', markers)
}

/**
 * Write out JSON file with an array of objects based on pages from DatoCMS
 * Used for the globe visualisation
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateBooks (dato, root, i18n) {
  const books = getBooks(dato)
  books.forEach(book => root.createDataFile(`static/data/books/${book.slug}/index.json`, 'json', book))
  root.createDataFile(`static/data/books/index.json`, 'json', books)

  const chapters = books.map(book => getChaptersFromBook(dato, book))
    .reduce((a, b) => a.concat(b), [])
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
      // Loop over books
      const { title, slug, chapters } = entity
      const path = `/narratives/${slug}`
      const chapterEntities = getChaptersById(dato, chapters).map(entity => {
        entity.path = `${path}/${slug}`
        entity.book = title
        return entity
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
 * Get Dato Chapter entities by Dato Book
 *
 * @param {Dato} dato
*/
function getChaptersFromBook (dato, book) {
  return book.chapters
    .filter(filterPublished)
    .map(chapterEntity => {
      const { title, slug, pages, characterPortrait, characterName, chapterType, influences } = chapterEntity
      const path = `${book.path}/${slug}`
      const chapterBook = {
        path: book.path,
        slug: book.slug,
        title: book.title
      }
      const pageEntities = getPagesByIds(dato, pages).map(pageEntity => {
        pageEntity.path = `${path}/${pageEntity.slug}`
        pageEntity.chapter = { path, slug, chapterType, title }
        pageEntity.book = chapterBook
        pageEntity.characterPortrait = characterPortrait
        pageEntity.characterName = characterName
        return pageEntity
      })
      let influencesArray = (influences || '').split(/,\s?/)
      influencesArray = (influencesArray[0] !== '') ? influencesArray : []

      return {
        title,
        slug,
        path,
        book: chapterBook,
        pages: pageEntities,
        characterName,
        characterPortrait,
        influences: influencesArray
      }
    })
}

/**
 * Get Dato Chapter entities by array of Ids
 *
 * @param {Dato} dato
 * @param {number[]} ids
 * @returns {object[]}
 */
function getChaptersById (dato, ids) {
  return ids.map((id) => {
    const { entity } = dato.find(id)
    const { title, slug, pages, characterName, characterPortrait, chapterType, influence, subTheme } = entity
    return { title, slug, pages, characterName, characterPortrait, chapterType, influence, subTheme }
  })
}

/**
 * Get Dato Page entities by array of Ids
 *
 * @param {Dato} dato
 * @param {number[]} ids
 * @returns {object[]}
 */
function getPagesByIds (dato, ids) {
  return ids.map((id) => {
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
  return true // return item.published eventually
}
