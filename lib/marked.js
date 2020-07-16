const marked = require('marked');

/**
 * render content with
 *
 * @param {string} content from dato
 * @returns {string} formatted content in html
 */

module.exports = function renderMarkedContent (content) {
  marked.use({ renderer: { image } })

  let formatted;
  if (content) {
    formatted = marked(content);
  }
  return formatted;
}

function image(href, title, alt) {
  const imageInstances = [320, 640, 720, 1280];
  const sizes = [
    { media: '(min-width: 1024px)', width: '656px' },
    { media: '(min-width: 768px)', width: '720px' },
    { width: '100vw' },
  ];

  const srcetValue = imageInstances.map(width => {
    return `${href}?auto=compress,format&w=${width} ${width}w`;
  }).join(', ');

  const sizesValue = sizes.map(({ width, media = '' }) => {
    return `${media} ${width}`;
  }).join(', ')

  return `<img
            srcset="${srcetValue}"
            sizes="${sizesValue}"
            src="${href}?auto=compress,format"
            alt="${alt.length ? alt : ''}"
            />`;
}
