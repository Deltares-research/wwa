import marked from 'marked'

/**
 * render content with markup and custom first paragraph
 *
 * @param {string} content from dato
 * @returns {string} formatted content in html
 */

export default function renderMarkedContent (content) {
  const renderer = new marked.Renderer()
  renderer.paragraphCount = 0 // Need to keep track of the number of paragraphs

  renderer.paragraph = function (content) {
    const i = this.paragraphCount || 0
    this.paragraphCount++
    return `<p ${(!i) ? 'class="intro"' : ''}>${content}</p>` // custom paragraph markup
  }

  let formatted
  if (content) {
    formatted = marked(content, { renderer })
  }
  return formatted
}
