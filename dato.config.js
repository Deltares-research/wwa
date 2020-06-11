const pick = require('lodash/fp/pick')
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
  const { body } = dato.home

  root.createDataFile(`static/data/home.json`, 'json', {
    body
  })

  switch (exportScope) {
    case 'books':
      generateBooks(dato, root, i18n)
      break
    case 'chapters':
      generateChapters(dato, root, i18n)
      break
    case 'filters':
        generateFilters(dato, root, i18n)
        break
    case 'influences':
      generateByInfluence(dato, root, i18n)
      break
    case 'goals':
      generateByGoal(dato, root, i18n)
      break
    case 'methodology':
        generateByMethodology(dato, root, i18n)
        break
    case 'keywords':
      generateByKeyword(dato, root, i18n)
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
      generateByInfluence(dato, root, i18n)
      generateByGoal(dato, root, i18n)
      generateByMethodology(dato, root, i18n)
      generateByKeyword(dato, root, i18n)
      generateFilters(dato, root, i18n)
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
      console.info(`Skipped chapter ${chapter.title}, book is null`)
    }
  }
}

/**
 * Write out JSON files by influence tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByInfluence (dato, root, i18n) {
  const influences = getInfluences(dato)
  const chapters = getChapters(dato)
    .filter(chapter => chapter.influences)
    .map(chapter => {
      delete chapter.pages
      delete chapter.keywords
      return chapter
    })

  for (const influence of influences) {
    const chaptersByInfluences = chapters
      .filter(chapter => chapter.influences)
      .filter(chapter => chapter.influences.some(chapterInfluence => chapterInfluence.slug === influence.slug))
    root.createDataFile(`static/data/influences/${influence.slug}.json`, 'json', { ...influence, entries: chaptersByInfluences })
  }
  root.createDataFile('static/data/influences/index.json', 'json', influences)
}

/**
 * Write out JSON files by goal tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByGoal (dato, root, i18n) {
  const goals = getGoals(dato)
  const chapters = getChapters(dato)
    .filter(chapter => chapter.goals)
    .map(chapter => {
      delete chapter.pages
      delete chapter.keywords
      return chapter
    })

  for (const goal of goals) {
    const chaptersByGoals = chapters
      .filter(chapter => chapter.goals)
      .filter(chapter => chapter.goals.some(chapterGoal => chapterGoal.slug === goal.slug))
    root.createDataFile(`static/data/goals/${goal.slug}.json`, 'json', { ...goal, entries: chaptersByGoals })
  }
  root.createDataFile('static/data/goals/index.json', 'json', goals)
}

/**
 * Write out JSON files by methodology tag
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByMethodology (dato, root, i18n) {
  const methodologies = getMethodologies(dato)
  const chapters = getChapters(dato)
    .filter(chapter => chapter.methodologies)
    .map(chapter => {
      delete chapter.pages
      delete chapter.keywords
      return chapter
    })

  for (const methodology of methodologies) {
    const chaptersByMethodology = chapters
      .filter(chapter => chapter.methodologies)
      .filter(chapter => chapter.methodologies.some(chapterMethodology => chapterMethodology.slug === methodology.slug))
    root.createDataFile(`static/data/methodologies/${methodology.slug}.json`, 'json', { ...methodology, entries: chaptersByMethodology })
  }
  root.createDataFile('static/data/methodologies/index.json', 'json', methodologies)
}

/**
 * Write out JSON files by keyword
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateByKeyword (dato, root, i18n) {
  const pages = getPages(dato)
  const tags = collectPagesByKeyword(pages)
  const index = []
  for (const tag in tags) {
    const pages = tags[tag]
    const tagObj = Object.assign({}, tags[tag])
    delete tagObj.entries // not needed in index
    index.push(tagObj)
    root.createDataFile(`static/data/keywords/${tagObj.slug}.json`, 'json', pages)
  }
  root.createDataFile(`static/data/keywords/index.json`, 'json', index.filter(i => i.slug !== 'unfiled'))
}

/**
 * Write out JSON file containing all filters
 *
 * @param {Dato} dato - DatoCMS API
 * @param {Root} root - Project root
 * @param {i18n} i18n
 */
function generateFilters (dato, root, i18n) {
  const filters = dato.app.filters.map(filter => {
    return {
      title: filter.title,
      shortTitle: filter.shortTitle,
      slug: filter.slug,
      filterItems: filter.filterItems.map(filterItem => {
        return {
          title: filterItem.title,
          slug: filterItem.slug
        }
      })
    }
  })
  root.createDataFile(`static/data/filters.json`, 'json', filters)
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
      delete chapter.keywords
      delete chapter.influences
      delete chapter.goals
      return chapter
    })
  for (const theme of themes) {
    const chaptersByTheme = chapters.filter(chapter => chapter.theme.slug === theme.slug)
    root.createDataFile(`static/data/themes/${theme.slug}.json`, 'json', { ...theme, entries: chaptersByTheme })
  }
  root.createDataFile(`static/data/themes/index.json`, 'json', themes)
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
      const { body, images, slug, title, video } = page
      return { body, images, slug, title, video }
    })
  for (const page of staticPages) {
    root.createDataFile(`static/data/static-pages/${page.slug}.json`, 'json', page)
  }
  const staticPageIndex = staticPages.map(page => ({ path: `/${page.slug}` }))
  root.createDataFile('static/data/static-pages/index.json', 'json', staticPageIndex)
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
          const { location, pages, path, slug, title, influences, goals, methodologies, keywords, createdAt, updatedAt, cover } = chapter
          const theme = getDominantTheme(pages)
          return { influences, goals, methodologies, keywords, location, path, slug, title, theme, createdAt, updatedAt, cover }
        })
      const theme = getDominantTheme(chapters)
      const influences = collectUniqueTags(chapters, 'influences')
      const goals = collectUniqueTags(chapters, 'goals')
      const methodologies = collectUniqueTags(chapters, 'methodologies')
      const keywords = collectUniqueTags(chapters, 'keywords')
      return { body, chapters, influences, goals, methodologies, keywords, path, slug, title, theme }
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
      const { title, slug, chapterType, createdAt, updatedAt, cover } = chapter
      const parentBook = bookRef || getParent(dato, chapter)
      if (!parentBook) {
        console.info(`Skipped chapter ${title}, no parent book found`)
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
      const location = (firstLocationPage) ? firstLocationPage.location : null
      const influences = collectUniqueTags(pages, 'influences')
      const goals = collectUniqueTags(pages, 'goals')
      const methodologies = collectUniqueTags(pages, 'methodologies')
      const keywords = collectUniqueTags(pages, 'keywords')
      const coverFallback = getChapterCover(pages)
      const related = chapter.related.length < 1
        ? []
        : chapter.related
          .map(chapter => ({ ...chapter, pages: getPages(dato, chapter), parent: getParent(dato, chapter) }))
          .filter(chapter => chapter.parent)
          .map(pick(['title', 'slug', 'cover', 'pages', 'parent']))
          .map(item => ({
            ...item,
            bookTitle: item.parent.title,
            path: `${contentBasePath}/${item.parent.slug}/${item.slug}`,
            cover: item.cover ? item.cover : getChapterCover(item.pages)
          }))
          .map(({ pages, parent, ...chapter }) => chapter)

      return {
        book,
        influences,
        goals,
        methodologies,
        location,
        keywords,
        pages,
        pageCount: pages.length,
        path,
        slug,
        storyteller,
        title,
        type: chapterType,
        theme,
        nextChapter,
        previousChapter,
        createdAt,
        updatedAt,
        cover: cover || coverFallback,
        related
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
      const { body, files, graphs, images, keywords, slug, title, video, mapboxStyle } = page
      const influences = (page.influence) ? page.influence.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        path: `/influences/${tag.slug}`
      })) : []
      const goals = (page.goal) ? page.goal.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        path: `/goals/${tag.slug}`
      })) : []
      const methodologies = (page.methodology) ? page.methodology.map(tag => ({
        title: tag.title,
        slug: tag.slug,
        path: `/methodologies/${tag.slug}`
      })) : []
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
      const parentChapter = chapterRef || getParent(dato, page)
      const parentBook = getParent(dato, parentChapter) || {}
      const book = (parentBook) ? {
        path: `${contentBasePath}/${parentBook.slug}`,
        slug: parentBook.slug,
        title: parentBook.title
      } : {}
      const chapter = {
        path: `${book.path}/${parentChapter.slug}`,
        slug: parentChapter.slug,
        title: parentChapter.title,
        type: parentChapter.chapterType
      }
      const path = `${chapter.path}#${slug}`
      const links = (page.links) ? page.links.split('\n')
        .map(link => {
          const title = (link.match(/\[(.*?)\]/)) ? link.match(/\[(.*?)\]/)[1] : null
          const path = (link.match(/\((.*)\)/)) ? link.match(/\((.*)\)/)[1] : null
          return {
            title: title,
            path: path
          }
        }) : null
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
        influences,
        goals,
        methodologies,
        path,
        slug,
        storyteller: {
          avatar: page.storytellerAvatar,
          name: page.storyteller
        },
        partner: {
          logo: page.partnerLogo,
          name: page.partnerName
        },
        theme,
        title,
        video,
        mapboxStyle
      }
    })
}

/**
 * Get Dato Influence entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getInfluences (dato) {
  const influences = dato.influences
  return influences.map(influence => {
    const { body, slug, title } = influence
    const path = `/influences/${slug}`
    return { body, path, slug, title }
  })
}

/**
 * Get Dato Goal entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getGoals (dato) {
  const goals = dato.goals
  return goals.map(goal => {
    const { body, slug, title } = goal
    const path = `/goals/${slug}`
    return { body, path, slug, title }
  })
}

/**
 * Get Dato Methodology entities
 *
 * @param {Dato} dato
 * @returns {Object}
*/
function getMethodologies (dato) {
  const methodologies = dato.methodologies
  return methodologies.map(goal => {
    const { body, slug, title } = goal
    const path = `/methodologies/${slug}`
    return { body, path, slug, title }
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
 * collect Chapter entities in object by keyword
 *
 * @param {DatoRecord[]} pages
 * @returns {object} arrays of Pages by tag
 */
function collectPagesByKeyword (pages) {
  return pages
    .map(page => {
      const { book, chapter, keywords, location, influences, goals, path, slug, storyteller, theme, title } = page
      return {
        tags: page.keywords,
        page: { book, chapter, keywords, location, influences, goals, path, slug, storyteller, theme, title }
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

  return Object.values(themes).sort((a, b) => a.score < b.score)[0]
}

/**
 * Get the first image found in the pages array
 *
 * @param {object[]} pages
 */
function getChapterCover (pages) {
  const images = pages
    .filter(page => page.images)
    .map(page => page.images)
    .reduce((list, images) => [...list, ...images])
  return images[0]
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
