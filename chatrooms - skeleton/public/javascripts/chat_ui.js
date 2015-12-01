function divEscapedContentElement(message) {
	return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
	var message = $('#send-message').val();
	var systemMessage;

	if (message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		chatApp.sendMessage($('#room').text(), message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}
	$('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);
	
	socket.on('nameResult', function(result) {
		/*
		 * If the change is succesfull
		 * then let the user know her new name
		 * else let her know the error message
		 * Only to the user, do not broadcast the message
		 */
	});

	socket.on('joinResult', function(result) {
		/*
		 * Change the name of the current room in #room
		 * Let the user know the change of the room
		 */
	});

	socket.on('message', function(message) {
		/*
		 * Append new message
		 */
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	});

	socket.on('rooms', function(rooms) {
		/*
		 * Empty #room-list
		 * Add all the rooms to the list (use divEscapedContentElement)
		 * Make each #room-list div clickable, enabling changing the room
		 */
	});

	setInterval(function() {
		socket.emit('rooms');
	}, 1000);

	$('#send-message').focus();

	$('#send-form').submit(function() {
		processUserInput(chatApp, socket);
		return false;
	});
});
