const Pv = require('../dbs/models/pv')
const moment = require('moment')

module.exports = function () {
  return async (ctx, next) => {
    const reg = /\/api/
    if (ctx.request.url.match(reg)) {
      try {
        let ip = getClientIP(ctx.req);
        await Pv.create({
          ip: ip,
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

function getClientIP(req) {
  return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress || '0.0.0.0';
};
