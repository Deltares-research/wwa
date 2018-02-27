import axios from 'axios'
import { intersectByProp } from '~/lib/set-operations'

/**
 * Load data based on parameters
 *
 * @param {object} context object passed from asyncData
 * @param {object} params key:value[] pairs of params
 * @returns {object} data
 */
export default async function loadData (context, params) {
  const routerBase = context.app.router.options.base
  const { book, chapter, keywords, influences, theme, staticPage } = params
  let get
  let data
  let path = `data`
  if (process.client) {
    // On client load from over http
    get = async path => axios.get(`${routerBase}${path}`).then(res => res.data)
  } else {
    // On server load from file system
    get = async path => import(`~/static/${path}`)
  }
  switch (true) {
    case (Boolean(book)):
      path = `${path}/books`
      path = (book === 'index') ? path : `${path}/${book}`
      path = (chapter && chapter !== 'index') ? `${path}/chapters/${chapter}` : path
      path = `${path}/index.json`
      data = get(path)
      break
    case (Boolean(influences) || Boolean(keywords)):
      let tagType
      let tags
      if (influences) {
        tagType = 'influences'
        tags = influences
      } else {
        tagType = 'keywords'
        tags = keywords
      }
      const tagData = await Promise.all(tags.map(tag => get(`${path}/${tagType}/${tag}.json`)))
      const entriesArrays = tagData.map(tag => tag.entries)
      // Make results the intersect of all entries by tag
      const results = entriesArrays.reduce((shared, set) => intersectByProp(shared, set, 'slug'), entriesArrays[0]) // start with first entry, *not* an empty array
      data = {
        tags: tagData.map(tag => {
          delete tag.entries // these are not needed anymore
          return tag
        }),
        results
      }
      break
    case (Boolean(theme)):
      if (theme !== 'index') {
        path = `${path}/themes/${theme}.json`
      } else {
        path = `${path}/themes/index.json`
      }
      data = get(path)
      break
    case (Boolean(staticPage)):
      path = `${path}/${staticPage}.json`
      data = get(path)
      break
    default:
      path = `${path}/books/index.json`
      data = get(path)
  }
  return data
}
