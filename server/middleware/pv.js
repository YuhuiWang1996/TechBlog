const Pv = require('../dbs/models/pv')
const moment = require('moment')

module.exports = function () {
  return async (ctx, next) => {
    const reg = /\/api/
    if (ctx.request.url.match(reg)) {
      console.log(ctx.request.url)
      try {
        await Pv.create({
          url: ctx.request.url,
          createAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        })
      } catch (e) {
        console.log(e)
      }
    };
    await next()
  }
}
