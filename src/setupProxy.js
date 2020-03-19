const { createProxyMiddleware }  = require('http-proxy-middleware');
module.exports = function(app) {
  // ...You can now register proxies as you wish!  
  app.use(createProxyMiddleware('/vkey', { 
    target: "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        '^/vkey': ''
      }
   }));
   app.use(createProxyMiddleware('/mp3', { 
    target: "http://ws.stream.qqmusic.qq.com",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
        '^/mp3': ''
      }
  
   }));
  //app.use(proxy('/apc', { target: 'http://172.19.5.34:9531' }));
};