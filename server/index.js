const Koa = require('koa')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')

const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const pv = require('./middleware/pv')
const dbConfig = require('./dbs/config')
const articles = require('./interface/articles')
const koaBody = require('koa-body');

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '0.0.0.0',
      port = process.env.PORT || 80
  } = nuxt.options.server

  app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
  }))
  app.use(json())
  
  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  })

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(pv())
  app.use(articles.routes()).use(articles.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
