import axios from 'axios'
import { config } from '../package.json'
/**
 * Load data based on parameters
 *
 * @param {object} context object passed from asyncData
 * @param {object} params key:value[] pairs of params
 * @returns {object} data
 */
export default async function loadData (context, params) {
  const host = (context.req) ? context.req.headers.host : `localhost:${config.nuxt.port}`
  const { book, chapter, keywords, influences, theme } = params
  const get = async path => axios.get(`http://${host}${path}`).then(res => res.data)
  let path = '/data'
  let data
  switch (true) {
    case (Boolean(book)):
      path = `${path}/books/${book}`
      path = (chapter) ? `${path}/chapters/${chapter}` : path
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
      const sets = tagData.map(tag => tag.entries)
      // Make entries the intersect of all entries by tag
      const entries = sets.reduce((shared, set) => intersectByProp(shared, set), sets[0]) // start with first entry, *not* an empty array
      data = {
        tags: tagData.map(tag => {
          delete tag.entries // these are not needed anymore
          return tag
        }),
        entries
      }
      break
    case (Boolean(theme)):
      path = `${path}/themes/${theme}.json`
      data = get(path)
      break
  }

  return data
}
/**
 * Return intersection of two object arrays based on a property within the object
 *
 * @param {object[]} arrayA
 * @param {object[]} arrayB
 * @param {string} [prop = 'path']
 * @returns {object[]}
 */
function intersectByProp (arrayA, arrayB, prop = 'path') {
  return arrayA.filter(itemA => (arrayB.some(itemB => itemA[prop] === itemB[prop])))
}
