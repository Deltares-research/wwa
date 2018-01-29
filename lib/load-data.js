import axios from 'axios'
import { config } from '../package.json'
/**
 * Load data
 *
 * @param {object} context object passed from asyncData
 * @returns {object} data
 */
export default async function loadData (context) {
  const host = env.baseUrl
  const { book, chapter } = context.params
  let path = '/data'
  if (book) {
    path = `${path}/books/${book}`
    path = (chapter) ? `${path}/chapters/${chapter}` : path
    path = `${path}/index.json`
  }

  return axios.get(`http://${host}${path}`).then(res => res.data)
}
