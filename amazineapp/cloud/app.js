// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.get('/play/*', function(req, res) {
  var query = new AV.Query("video");
  var objId = String(req.params);
  query.include("user_id");
  query.get(objId, {
  success: function(videoObj) {
      var title = videoObj.get("title");
      var content = videoObj.get("content");
      var video = videoObj.get("video");
      var publisher = videoObj.get("user_id");
      var pubAvatar = publisher.get("image");
      var avatar = pubAvatar["_url"];
      res.render('video_detail', {videoTitle: title, videoContent: content, videoThumbnail:videoObj.get("image")["_url"],videoUrl: video["_url"], videoPublisher:avatar})
  },
  error: function(videoObj, err) {
      console.log(err);
      res.render('no_video', {});
  }});
});

app.get('/video/*', function(req, res) {
  var vurl = req.params;
  res.render('video_play', { message: vurl });
});
// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
