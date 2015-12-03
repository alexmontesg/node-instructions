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
			// Concatenate every chunk received in req.on('data')
			// Add the concatenation in req.on('end') and write the response
			break;
		case 'GET':
			// Print the list of all items in plain text
			break;
		case 'DELETE':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			if (isNaN(i)) {
				// Respond with an error message and code 400
			} else if (!items[i]) {
				// Respond with an error message and code 404
			} else {
				// Delete item from the list and write the response
			}
			break;
		case 'PUT':
			var path = url.parse(req.url).pathname;
			var i = parseInt(path.slice(1), 10);
			var newText = getQueryVariable(url.parse(req.url).query, "text");
			if (isNaN(i) || !newText) {
				// Respond with an error message and code 400
			} else if (!items[i]) {
				// Respond with an error message and code 404
			} else {
				// Update item in the list and write the response
			}
			break;
	}
});

server.listen(3000);
