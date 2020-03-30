const Router = require('koa-router')
const Articles = require('../dbs/models/articles')
const Config = require('../dbs/models/config')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const koaBody = require('koa-body')

let router = new Router({
  prefix: '/api/articles'
})

router.post('/addImg', koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认5M
  }
}), async (ctx) => {
  const image = ctx.request.files.image;
  const reader = fs.createReadStream(image.path);
  const filename = moment().unix() + '-' + parseInt(Math.random() * 100) + '.png';
  let filePath = path.join(__dirname, '../../static/documents/img/') + filename;
  const upStream = fs.createWriteStream(filePath);
  reader.pipe(upStream);
  ctx.status = 200;
  return ctx.body = {
    code: 0,
    data: {
      filePath: `../../documents/img/${filename}`
    }
  };
});

router.post('/create', async (ctx) => {
  const {
    post_pwd
  } = ctx.request.body;
  const _pwd_obj = await Config.findOne({
    name: 'post_pwd'
  });
  if (_pwd_obj.value !== post_pwd) {
    ctx.status = 200;
    return ctx.body = {
      code: -1,
      msg: '密码错误'
    }
  }

  const {
    title_en,
    title,
    brief,
    type,
    tags,
    content,
    showInHome,
    showInArticles
  } = ctx.request.body;

  try {
    let article = await Articles.create({
      id: title_en,
      title_en: title_en,
      title: title,
      brief: brief,
      doc: `/documents/notype/${title_en}.md`,
      type: type,
      tags: tags,
      showInHome: showInHome,
      showInArticles: showInArticles,
      createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      updateAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      rank: 10
    })
    let filePath = path.join(__dirname, `../../static/documents/notype/${title_en}.md`);
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        console.log(err)
      }
    });
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: {}
    }
  } catch (e) {
    ctx.status = 200;
    ctx.body = {
      code: -1,
      msg: '保存数据库失败'
    }
  }
})

// 首页文章列表
router.get('/all', async (ctx) => {
  try {
    const result = await Articles.find({
      // type: {
      //   $ne: '便签'
      // },
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
