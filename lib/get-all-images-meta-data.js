const fetchContent = require('./fetch-content');
const fs = require('fs');
const path = require('path');

async function getAllImagesMetaData () {
  const query = `
    query allPages($first: IntType, $skip: IntType) {
      allUploads(filter: {type: {eq: image}}, first: $first, skip: $skip) {
        url
        alt
        title
      }
      _allUploadsMeta(filter: {type: {eq: image}}) {
        count
      }
    }
  `;
  const querySize = 100;
  const variables = { first: querySize, skip: 0 };

  let data = await fetchContent(query, variables);

  const extraQueryRuns = data['_allUploadsMeta'].count ? Math.floor(data['_allUploadsMeta'].count / querySize) : 0;

  for (let i = 1; i <= extraQueryRuns; i++) {
    const variables = { first: querySize, skip: i * querySize };
    const nextSet = await fetchContent(query, variables);
    data['allUploads'] = data['allUploads'].concat(nextSet['allUploads']);
  }

  return data['allUploads']
    .filter(upload => upload.title !== null || upload.alt !== null)
    .reduce((uploads, upload) => (uploads[upload.url] = { alt: upload.alt, title: upload.title}, uploads), {});
}

getAllImagesMetaData().then(data => {
  fs.mkdirSync(path.join(process.cwd(), 'static/data'), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), 'static/data/image-meta-data.json'), JSON.stringify(data));
});
