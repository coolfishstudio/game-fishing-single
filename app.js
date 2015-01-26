var http = require('http'),
	fs = require('fs');

var port = 9281;//端口号

/*
	这是一个简单的服务器 
	主要作用是 启动这个静态文件
	只支持 加载png/js
	默认跳转也面 只有首页
*/
var server = http.createServer(function(req, res){
	if('GET' == req.method){//进入游戏页
		if('/' == req.url){
			serve(__dirname + '/index.html', 'text/html');
		}else if('/images/' == req.url.substr(0,8)){
			serve(__dirname + req.url, 'image/png');
		}else if('/src/' == req.url.substr(0,5)){
			serve(__dirname + req.url, 'text/javascript');
		}
	}else{
		res.writeHead(404);
		res.end('Not found');
	}
	function serve(path, type){
		res.writeHead(200, {'Content-Type': type});
		fs.createReadStream(path).pipe(res);
	}
	function getType(url){
		return url.substring(url.lastIndexOf('.'), url.length);
	}
});
server.listen(port, function(){
	console.log('Express server listening on port ' + port);
});