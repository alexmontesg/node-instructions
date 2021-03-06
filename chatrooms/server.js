var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.write(fileContents);
	response.end(fileContents);
}

function send404(response) {
	/*
	 * Imitating the function above, write code to respond
	 * with an error. Use the error code 404 and the
	 * content type: text/plain. Write a simple text message
	 */
}

function serveStatic(response, cache, absPath) {
	if(cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if(exists) {
				fs.readFile(absPath, function(err, data) {
					if(err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
}

var server = http.createServer(function(request, response) {
	var filePath = false;
	/*
	 * If the request.url is /~Your_user/ or /~Your_user
	 * Then initialize filePath to 'public/index.html'
	 * Otherwise initialize replace /~Your_user with 'public'
	 * and initialize filePath with that value
	 */
	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
	console.log("Server listening on port 3000.");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);
