const slug = require('slug')

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
    case 'influences':
      generateByTag(dato, root, i18n, 'influences')
      break
    case 'keywords':
      generateByTag(dato, root, i18n, 'keywords')
      break
    case 'themes':
      generateThemes(dato, root, i18n)
      break
    default:
      generateChapters(dato, root, i18n)
      generateBooks(dato, root, i18n)
      generateGlobeMarkers(dato, root, i18n)
      generateByTag(dato, root, i18n, 'influences')
      generateByTag(dato, root, i18n, 'keywords')
      generateThemes(dato, root, i18n)
  }
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
 * Write out JSON files by tagType
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 * @param {string} tagType
 */
function generateByTag (dato, root, i18n, tagType) {
  const pages = getPages(dato)
  const tags = collectPagesByTagType(pages, tagType)
  const dir = tagType
  for (const tag in tags) {
    const pages = tags[tag]
    root.createDataFile(`static/data/${dir}/${slug(tag)}.json`, 'json', pages)
  }
  root.createDataFile(`static/data/${dir}/index.json`, 'json', Object.keys(tags))
}

/**
 * Write out JSON files by theme
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateThemes (dato, root, i18n) {
  const books = getBooks(dato)
  const themes = collectBooksByTheme(books)
  const dir = 'themes'
  for (const theme in themes) {
    const books = themes[theme]
    root.createDataFile(`static/data/${dir}/${slug(theme)}.json`, 'json', books)
  }
  root.createDataFile(`static/data/${dir}/index.json`, 'json', Object.keys(themes))
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
      const { chapters, slug, title, theme } = entity
      const path = `${contentBasePath}/${slug}`
      const chapterEntities = chapters
        .filter(filterPublished)
        .map(id => {
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
          return { location, path: chapterPath, slug, title, type: chapterType }
        })

      // create book
      return {
        chapters: chapterEntities,
        path,
        slug,
        theme,
        title
      }
    })
}

/**
 * Get Dato Chapter entities
 *
 * @param {Dato} dato
 * @param {DatoRecord} [book] optional book to get chapters from
*/
function getChapters (dato, book) {
  const chapters = (book) ? book.chapters : dato.chapters
  return chapters
    .filter(filterPublished)
    .map(chapter => {
      const { title, slug, chapterType } = chapter
      const bookRef = getParent(dato, chapter)
      const book = {
        path: `${contentBasePath}/${bookRef.slug}`,
        slug: bookRef.slug,
        title: bookRef.title
      }
      const path = `${book.path}/${slug}`
      const pages = getPages(dato, chapter)
      const storyteller = pages.filter(page => page.location)[0].storyteller
      const location = pages.filter(page => page.location)[0].location
      return {
        book,
        location,
        pages,
        path,
        slug,
        storyteller,
        title,
        type: chapterType
      }
    })
}

/**
 * Get Dato Page entities
 *
 * @param {Dato} dato
 * @param {DatoRecord} [chapter] optional chapter to get chapters from
*/
function getPages (dato, chapterRef) {
  let pages = []
  if (chapterRef) {
    pages = chapterRef.pages
  } else {
    pages = dato.chapters
      .map(chapter => chapter.pages)
      .reduce((a, b) => a.concat(b), [])
  }
  return pages
    .filter(filterPublished)
    .map(page => {
      const { body, files, graphs, images, influences, keywords, links, slug, title, video } = page
      const location = (page.location) ? {
        lat: page.location.latitude,
        lng: page.location.longitude,
        zoom: page.zoomlevel
      } : null
      chapterRef = chapterRef || getParent(dato, page)
      const bookRef = getParent(dato, chapterRef)
      const book = {
        path: `${contentBasePath}/${bookRef.slug}`,
        slug: bookRef.slug,
        title: bookRef.title
      }
      const chapter = {
        path: `${book.path}/${chapterRef.path}`,
        slug: chapterRef.slug,
        title: chapterRef.title,
        type: chapterRef.chapterType
      }
      const theme = bookRef.theme
      const path = `${chapter.path}/${slug}`
      return {
        body,
        book,
        chapter,
        files,
        graphs,
        images,
        keywords,
        links,
        location,
        influences,
        path,
        slug,
        storyteller: {
          avatar: page.storytellerAvatar,
          name: page.storyteller
        },
        theme,
        title,
        video
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

/**
 * Get 'parent' of child when no tree structure is defined
 *
 * @param {Dato} dato
 * @param {DatoRecord} child
 * @returns {DatoRecord} parent
 */
function getParent (dato, child) {
  const childType = child.itemType.apiKey // get machine-readable entity name
  let parentType
  switch (childType) {
    case 'page':
      parentType = 'chapter'
      break
    case 'chapter':
      parentType = 'book'
  }

  return dato[`${parentType}s`] // hacky pluralisation
    .filter(parent => parent[`${childType}s`].some(
      childFromParent => childFromParent.id === child.id
    ))[0]
}

/**
 * collect Page entities in object by tag
 *
 * @param {DatoRecord[]} pages
 * @param {string} tagType type of tag to use
 * @returns {object} arrays of Pages by tag
 */
function collectPagesByTagType (pages, tagType) {
  return pages
    .map(page => {
      const { book, chapter, keywords, location, influences, path, slug, storyteller, theme, title } = page
      return {
        tags: page[tagType],
        page: { book, chapter, keywords, location, influences, path, slug, storyteller, theme, title }
      }
    })
    .filter(match => Boolean(match.tags)) // filter falsy (false, undefined, '')
    .map(match => match.tags.split(/,\s*/).map(tag => {
      return {
        tag: tag.toLowerCase(),
        page: match.page
      }
    }))
    .reduce((a, b) => a.concat(b), []) // Flat array of keywords
    .reduce((tags, match) => {
      tags[match.tag] = tags[match.tag] || []
      tags[match.tag].push(match.page)
      return tags
    }, {})
}

/**
 * collect Book entities in object by theme
 *
 * @param {DatoRecord[]} books
 * @returns {object} arrays of Books by theme
 */
function collectBooksByTheme (books) {
  return books
    .reduce((themes, book) => {
      if (book.theme) {
        themes[book.theme] = themes[book.theme] || []
        themes[book.theme].push(book)
      }
      return themes
    }, {})
}
