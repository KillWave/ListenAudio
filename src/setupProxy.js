const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require("axios");
module.exports = function (app) {
  app.get("/lyric",(req,res)=>{
    const url = "https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg";
    axios.get(url,{
      headers:{
      referer:"https://y.qq.com/portal/player.html",
      host:"c.y.qq.com"
    },
    params:req.query
    }).then(response=>{
      res.json(response.data);
    })

  })

  app.use(createProxyMiddleware('/vkey', {
    target: "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/vkey': ''
    }
  }));
  app.use(createProxyMiddleware('/serch', {
    target: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/serch': ''
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