var express = require('express');
var app = express();

var games = require('./services/games');

app.set('port', (process.env.PORT || 5001));

app.get('/game', function(request, response) {
	var callback = function (status, message) {
		response.json({
			success: status,
  			message: message
  		});
	}

  games.todaysGame(request.query.team, callback);	
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});