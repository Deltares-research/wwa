const SiteClient = require('datocms-client').SiteClient
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv-safe')
const bent = require('bent')

dotenv.config()

module.exports = (dato, root, i18n) => {
  const client = new SiteClient(process.env.DATO_API_TOKEN)
  backup(client)
}

function backup (client) {
  console.info('Downloading records...')
  client.items.all({}, { allPages: true })
    .then(response => {
      fs.writeFileSync('backup/records.json', JSON.stringify(response, null, 2))
    })
    .then(() => {
      return client.site.find()
    })
    .then((site) => {
      client.uploads.all({}, { allPages: true })
        .then(
          uploads => {
            return uploads.reduce(
              (chain, upload) => {
                return chain.then(() => {
                  return new Promise((resolve) => {
                    const stream = fs.createWriteStream('./backup/' + path.basename(upload.path))
                    stream.on('close', resolve)
                    bent(`https://${site.imgixHost}`)(upload.path).then(result => result.pipe(stream))
                  })
                })
              },
              Promise.resolve())
          }
        )
    })
  console.info('Done!')
}
