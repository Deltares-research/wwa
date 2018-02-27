const slugify = require('slug')

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

/**
 * @typedef DatoRecord
 * @type {object}
 */

/**
 * @typedef linkObject
 * @type {object}
 * @property {title} title - Human-readable name
 * @property {slug} slug - Machine-readable name
 * @property {path} path - Resource location
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
    case 'influences':
      generateByTag(dato, root, i18n, 'influences')
      break
    case 'keywords':
      generateByTag(dato, root, i18n, 'keywords')
      break
    case 'static_pages':
      generateStaticPages(dato, root, i18n)
      break
    case 'themes':
      generateThemes(dato, root, i18n)
      break
    default:
      generateChapters(dato, root, i18n)
      generateBooks(dato, root, i18n)
      generateByTag(dato, root, i18n, 'influences')
      generateByTag(dato, root, i18n, 'keywords')
      generateStaticPages(dato, root, i18n)
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
  for (const chapter of chapters) {
    if (chapter.book != null) { // so that null result will not be written out
      root.createDataFile(`static/data/books/${chapter.book.slug}/chapters/${chapter.slug}/index.json`, 'json', chapter)
    } else {
      console.log(`Skipped chapter ${chapter.title}, book is null`)
    }
  }
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
  const index = []
  for (const tag in tags) {
    const pages = tags[tag]
    const tagObj = Object.assign({}, tags[tag])
    delete tagObj.entries // not needed in index
    index.push(tagObj)
    root.createDataFile(`static/data/${dir}/${slugify(tag)}.json`, 'json', pages)
  }
  root.createDataFile(`static/data/${dir}/index.json`, 'json', index.filter(i => i.slug !== 'unfiled'))
}

/**
 * Write out JSON files for static pages
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateStaticPages (dato, root, i18n) {
  const staticPages = dato.staticPages
    .filter(filterPublished)
    .map(page => {
      const { body, images, slug, title } = page
      return { body, images, slug, title }
    })
  for (const page of staticPages) {
    root.createDataFile(`static/data/${page.slug}.json`, 'json', page)
  }
}

/**
 * Write out JSON files by theme
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateThemes (dato, root, i18n) {
  const themes = getThemes(dato)
  const chapters = getChapters(dato)
    .filter(chapter => chapter.theme)
    .map(chapter => {
      delete chapter.pages
      return chapter
    })
  for (const theme of themes) {
    const chaptersByTheme = chapters.filter(chapter => chapter.theme.slug === theme.slug)
    root.createDataFile(`static/data/themes/${theme.slug}.json`, 'json', chaptersByTheme)
  }
  root.createDataFile(`static/data/themes/index.json`, 'json', themes)
}

/**
 * Get Dato Book entities
 *
 * @param {Dato} dato
 */
function getBooks (dato) {
  return dato.books
    .filter(filterPublished)
    .map(book => {
      const { body, slug, title } = book
      const path = `${contentBasePath}/${slug}`
      const chapters = getChapters(dato, book)
        .filter(filterPublished)
        .map(chapter => {
          const { location, pages, path, slug, title, influences, keywords } = chapter
          const theme = getDominantTheme(pages)
          return { influences, keywords, location, path, slug, title, theme }
        })
      const theme = getDominantTheme(chapters)
      const influences = collectUniqueTags(chapters, 'influences')
      const keywords = collectUniqueTags(chapters, 'keywords')
      return { body, chapters, influences, keywords, path, slug, title, theme }
    })
}

/**
 * Get Dato Chapter entities
 *
 * @param {Dato} dato
 * @param {DatoRecord} [book] optional book to get chapters from
*/
function getChapters (dato, bookRef) {
  const chapters = (bookRef) ? bookRef.chapters : dato.chapters
  return chapters
    .filter(filterPublished)
    .map(chapter => {
      const { title, slug, chapterType } = chapter
      const parentBook = bookRef || getParent(dato, chapter)
      if (!parentBook) {
        console.log(`Skipped chapter ${title}, no parent book found`)
        return false
      }
      const book = {
        path: `${contentBasePath}/${parentBook.slug}`,
        slug: parentBook.slug,
        title: parentBook.title,
        theme: parentBook.theme
      }
      const path = `${book.path}/${slug}`
      const pages = getPages(dato, chapter)
      const theme = getDominantTheme(pages)
      const neighbours = getNeighboursFromArray(chapter, parentBook.chapters)
      const previousChapter = (neighbours.previous) ? {
        path: `${contentBasePath}/${parentBook.slug}/${neighbours.previous.slug}`,
        slug: neighbours.previous.slug,
        title: neighbours.previous.title } : null
      const nextChapter = (neighbours.next) ? {
        path: `${contentBasePath}/${parentBook.slug}/${neighbours.next.slug}`,
        slug: neighbours.next.slug,
        title: neighbours.next.title } : null
      const firstLocationPage = pages.filter(page => page.location)[0]
      const storyteller = (firstLocationPage) ? firstLocationPage.storyteller : null
      const partner = (firstLocationPage) ? firstLocationPage.partner : null
      const location = (firstLocationPage) ? firstLocationPage.location : null
      const influences = collectUniqueTags(pages, 'influences')
      const keywords = collectUniqueTags(pages, 'keywords')

      return {
        book,
        influences,
        location,
        keywords,
        pages,
        partner,
        pageCount: pages.length,
        path,
        slug,
        storyteller,
        title,
        type: chapterType,
        theme,
        nextChapter,
        previousChapter
      }
    })
    .filter(Boolean) // Filter falsy chapters (return false)
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
      const { body, files, graphs, images, influences, keywords, links, slug, title, video, mapboxStyle } = page
      const theme = (page.theme) ? {
        title: page.theme.title,
        slug: page.theme.slug,
        path: `/themes/${page.theme.slug}`
      } : null
      const location = (page.location) ? {
        lat: page.location.latitude,
        lon: page.location.longitude,
        zoom: page.zoomlevel
      } : null
      chapterRef = chapterRef || getParent(dato, page)
      const bookRef = getParent(dato, chapterRef) || {}
      const book = (bookRef) ? {
        path: `${contentBasePath}/${bookRef.slug}`,
        slug: bookRef.slug,
        title: bookRef.title
      } : {}
      const chapter = {
        path: `${book.path}/${chapterRef.slug}`,
        slug: chapterRef.slug,
        title: chapterRef.title,
        type: chapterRef.chapterType
      }
      const path = `${chapter.path}#${slug}`
      const partner = (page.partnerName && page.partnerName !== page.storyteller) ? { logo: page.partnerLogo, name: page.partnerName } : null
      return {
        body,
        book,
        chapter,
        files,
        graphs,
        images,
        keywords: (keywords) ? tagStringToLinkObjects(keywords, 'keywords') : [],
        links,
        location,
        influences: (influences) ? tagStringToLinkObjects(influences, 'influences') : [],
        path,
        slug,
        storyteller: {
          avatar: page.storytellerAvatar,
          name: page.storyteller
        },
        partner,
        theme,
        title,
        video,
        mapboxStyle
      }
    })
}

/**
 * Get Dato Theme entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getThemes (dato) {
  const themes = dato.themes
  return themes.map(theme => {
    const { body, slug, title } = theme
    const path = `/themes/${slug}`
    return { body, path, slug, title }
  })
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
    .map(match => match.tags.map(tag => {
      return {
        tag: tag,
        page: match.page
      }
    }))
    .reduce((a, b) => a.concat(b), []) // Flat array of keywords
    .reduce((tags, match) => {
      tags[match.tag.slug] = tags[match.tag.slug] || {
        title: match.tag.title,
        slug: match.tag.slug,
        path: match.tag.path,
        entries: []
      }
      tags[match.tag.slug].entries.push(match.page)
      return tags
    }, {})
}

/**
 * Get unique array of tags from items
 *
 * @param {object[]} items
 * @returns {linkObject[]} theme
 */
function collectUniqueTags (items, tagType) {
  return items
    .map(item => item[tagType])
    .reduce((all, item) => all.concat(item), [])
    .filter((item, index, all) => {
      const slugs = all.map(a => a.slug)
      return slugs.indexOf(item.slug) === index
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
 * @returns {DatoRecord|undefined} record or undefined
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

  const parents = dato[`${parentType}s`].filter(parent => parent[`${childType}s`].some(
    childFromParent => childFromParent.id === child.id
  ))
  return (parents) ? parents[0] : undefined
}

/**
 * Get neighbours from array
 *
 * @param {Item} srcItem, [] array
 * @returns {previous{}, next{} }
*/
function getNeighboursFromArray (srcItem, array) {
  const index = array.findIndex(item => item.id === srcItem.id)
  return { 'previous': array[index - 1], 'next': array[index + 1] }
}

/**
 * Get highest occuring theme for array of items
 *
 * @param {object[]} items
 * @returns {linkObject[]} theme
 */
function getDominantTheme (items) {
  const themes = items
    .filter(item => item)
    .filter(item => item.theme) // strip out unset themes
    .reduce((themes, item) => {
      if (themes[item.theme.slug]) {
        themes[item.theme.slug].score++
      } else {
        themes[item.theme.slug] = Object.assign(item.theme, { score: 0 })
      }
      return themes
    }, {})

  return Object.values(themes).sort((a, b) => a.score > b.score)[0]
}

/**
 * Convert comma-separated string to array of linkObjects
 *
 * @param {string} tagString
 * @param {sting} tagType
 * @returns {linkObject[]}
 */
function tagStringToLinkObjects (tagString, tagType) {
  return (tagString) ? tagString.split(/,\s?/).map(string => {
    const slug = slugify(string).toLowerCase()
    return {
      title: string.toLowerCase(),
      slug: slug,
      path: `/${tagType}/${slug}`
    }
  }) : undefined
}
