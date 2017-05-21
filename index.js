var express = require('express');
var app = express();

var games = require('./services/games');

app.set('port', (process.env.PORT || 5001));

app.get('/execute', function(request, response) {
	var callback = function (status, message) {
		response.json({
      success: status,
      message: message
    })
	}

  executeCommand(parseCommand(request.query.command), callback)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})


var parseCommand = function (command = "") {
  var matches = command.toLowerCase().match(/(\w+)\s*(.*)/)
  
  return {
    command: (matches && matches.length > 1) ? matches[1] : null,
    parameters: (matches && matches.length > 2) ? matches[2].split(/\s+/) : null,
  }
}


var commandFns = {
  "game": games.todaysGame
}

var executeCommand = function (commandObj, callback) {
  commandFn = commandFns[commandObj.command]

  if (commandFn != null) {
    commandFn(commandObj.parameters, callback)
  } else {
    callback(false, "Command " + commandObj.command + " not found.")
  }
}