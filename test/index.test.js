import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// Nuxt defaults, but override them with package.json config when set
let server = {
  host: 'localhost',
  port: 3000
}
server.host = require('../package.json').config.nuxt.host || 'localhost'
server.port = parseInt(require('../package.json').config.nuxt.port, 10) || 3000
// Increment port by one
server.port++

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null

// Init Nuxt.js and start listeningß†
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(server.port, server.host)
})

// Example of testing only generated html
test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('World Water Atlas'))
})

// Example of testing via DOM checking
test('Route / exits and render HTML with CSS applied', async t => {
  console.log()
  const window = await nuxt.renderAndGetWindow(`http://${server.host}:${server.port}/`)
  const element = window.document.querySelector('.title')
  t.not(element, null)
})

// Close the Nuxt server
test.after('Closing server', t => {
  nuxt.close()
})
