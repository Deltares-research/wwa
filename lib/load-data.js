import axios from 'axios';
import { intersectByProp } from '~/lib/set-operations';

/**
 * Load data based on parameters
 *
 * @param {object} context object passed from asyncData
 * @param {object} params key:value[] pairs of params
 * @returns {object} data
 */
export default async function loadData (context, params) {
  const routerBase = context.app.router.options.base;
  const { book, chapter, keywords, influences, goals, methodologies, themes, staticPage } = params;
  let get;
  let data;
  let path;
  if (process.client) {
    // On client load from over http
    get = async path => axios.get(`${routerBase}data/${path}`).then(res => res.data);
  } else {
    // On server load from file system
    get = async path => { const result = await import(`~/static/data/${path}`); return result.default; };
  }
  switch (true) {
    case (Boolean(book)):
      path = `books`;
      path = (book === 'index') ? path : `${path}/${book}`;
      path = (chapter && chapter !== 'index') ? `${path}/chapters/${chapter}` : path;
      path = `${path}/index.json`;
      data = get(path);
      break;
    case (Boolean(influences) || Boolean(goals) || Boolean(methodologies) || Boolean(keywords)):
      let tags;
      if (influences) {
        path = 'influences';
        tags = influences;
      } else if (goals) {
        path = 'goals';
        tags = goals;
      } else if (methodologies) {
        path = 'methodologies';
        tags = methodologies;
      } else {
        path = 'keywords';
        tags = keywords;
      }
      const tagData = await Promise.all(tags.map(tag => get(`${path}/${tag}.json`)));
      const entriesArrays = tagData.map(tag => tag.entries);
      // Make results the intersect of all entries by tag
      const results = entriesArrays.reduce((shared, set) => intersectByProp(shared, set, 'slug'), entriesArrays[0]); // start with first entry, *not* an empty array
      data = {
        tags: tagData.map(tag => {
          delete tag.entries; // these are not needed anymore
          return tag;
        }),
        title: tagData[0].title,
        body: tagData[0].body,
        results,
      };
      break;
    case (Boolean(themes)):
      if (themes !== 'index') {
        path = `themes/${themes}.json`;
      } else {
        path = `themes/index.json`;
      }
      data = get(path);
      break;
    case (Boolean(staticPage)):
      path = `static-pages/${staticPage}.json`;
      data = get(path);
      break;
    case (Boolean(chapter)):
      path = chapter.path;
      data = get(path);
      break;
    default:
      path = `books/index.json`;
      data = get(path);
  }
  return data;
}
