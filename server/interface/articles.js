const Router = require('koa-router')
const Articles = require('../dbs/models/articles')

let router = new Router({
  prefix: '/api/articles'
})

router.post('/insert', async (ctx) => {
  const {
    title,
    brief,
    content
  } = ctx.request.body;
  let article = await Articles.create({
    title,
    brief,
    content
  })
})

// 首页文章列表
router.get('/all', async (ctx) => {
  try {
    const result = await Articles.find({
      type: {
        $ne: '便签'
      },
      showInHome: true,
      showInArticles: true
    }).sort('rank').sort({
      'updateAt': -1
    })
    ctx.body = result
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

// 文章，杂记，学习日记列表
router.get('/type', async (ctx) => {
  const type = ctx.query.type;
  try {
    const result = await Articles.find({
      'type': type,
      showInArticles: true
    }).sort('rank').sort({
      'updateAt': -1
    })
    ctx.body = result
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

router.get('/title_en/:title_en', async (ctx) => {
  const title_en = ctx.params.title_en
  try {
    const result = await Articles.findOne({
      title_en: title_en
    })
    ctx.body = {
      code: 0,
      data: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

module.exports = router
