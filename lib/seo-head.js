export default function seoHead(seo, path) {
  return {
    title: seo.title,
    meta: [
      {
        name: 'description',
        content: seo.description,
      },
      {
        property: 'og:title',
        content: `${seo.title} - World Water Atlas`,
      },
      {
        property: 'og:description',
        content: seo.description,
      },
      {
        property: 'og:image',
        content: seo.image ? `https://www.datocms-assets.com${seo.image}` : '',
      },
      {
        property: 'og:url',
        content: `https://www.worldwateratlas.org${path}`,
      },
      {
        name: 'twitter:title',
        content: `${seo.title} - World Water Atlas`,
      },
      {
        name: 'twitter:description',
        content: seo.description,
      },
      {
        name: 'twitter:image',
        content: seo.image ? `https://www.datocms-assets.com${seo.image}` : '',
      },
    ],
  };
}
