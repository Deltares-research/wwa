import marked from 'marked'

/**
 * render content with
 *
 * @param {string} content from dato
 * @returns {string} formatted content in html
 */

export default function renderMarkedContent (content) {
  const renderer = new marked.Renderer()

  let formatted
  if (content) {
    formatted = marked(content, { renderer })
  }
  return formatted
}
