var express = require('express');
var app = express();

var games = require('./services/games');

app.set('port', (process.env.PORT || 5001));

app.get('/game', function(request, response) {
	var callback = function (status, message) {
		response.json({
			success: status,
  			message: message
  		})
	}

  var commandObj = parseCommand(request.query.command)
  games.todaysGame(commandObj.command, callback);	
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})

var parseCommand = function (command) {
  var matches = command.toLowerCase().match(/(\w+)(.*)/)
  
  return {
    command: (matches.length > 1) ? matches[1] : null,
    parameters: (matches.length > 2) ? matches[2] : null,
  }
}