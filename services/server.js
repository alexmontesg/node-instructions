var http = require('http');
var url = require('url');
var items = [];

var getQueryVariable = function(query, variable) {
	if (query) {
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
	}
}

var server = http.createServer(function(req, res) {
	switch(req.method) {
		case 'POST':
			var item = '';
			req.on('data', function(chunk) {
				item += chunk;
			});
			req.on('end', function() {
				items.push(item);
				res.end('OK\n');
			});
			break;
		case 'GET':
			var body = items.map(function(item, i) {
				return (i + 1) + ') ' + item;
			}).join('\n');
			res.setHeader('Content-Length', Buffer.byteLength(body));
			res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
			res.end(body);
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				res.statusCode = 400;
				res.end('Invalid item id');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				items.splice(i, 1);
				res.end('OK\n');
			}
			break;
		case 'PUT':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			var newText = getQueryVariable(url.parse(req.url).query, "text");
			if (isNaN(i) || !newText) {
				res.statusCode = 400;
				res.end('Invalid item id or new text');
			} else if (!items[i]) {
				res.statusCode = 404;
				res.end('Item not found');
			} else {
				items[i] = newText;
				res.end('OK\n');
			}
			break;
	}
});

server.listen(3000);
