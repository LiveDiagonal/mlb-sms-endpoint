var request = require('request')
var Game = require('../lib/game')

module.exports = {
	todaysGame: function (parameters, callback) {
		var team = parameters[0] || "";

		request(url, function (error, response, body) {
			var games = JSON.parse(body).data.games.game;

			gameFound = false;
			games.forEach(function (game){
				var gameObj = new Game(game)
				
				if(gameObj.hasTeam(team)) {
					gameFound = true;

					callback(true, gameObj.title() + "\n" + game.time + " " + game.time_zone) ;
				}
			})

			if (!gameFound)
				callback(false, "Game not found for " + team + ".")
		});
	},
	score: function (parameters, callback) {
		var team = parameters[0] || "";

		request(url, function (error, response, body) {
			var games = JSON.parse(body).data.games.game;

			gameFound = false;
			games.forEach(function (game){
				var gameObj = new Game(game)

				if(gameObj.hasTeam(team)) {
					gameFound = true;
					
					var status = gameObj.title() + "\n" +
					gameObj.currentInning() + " B:" + game.status.b + " O:" + game.status.o + "\n" +
					game.home_name_abbrev + " R:" + game.linescore.r.home + " H:" + game.linescore.h.home + " E:" + game.linescore.e.home + "\n" +
					game.away_name_abbrev + " R:" + game.linescore.r.away + " H:" + game.linescore.h.away + " E:" + game.linescore.e.away;

					callback(true, status)
				}
			})

			if (!gameFound)
				callback(false, "Game not found for " + team + ".")
		})			
	},
	scorediff: function (parameters, callback) {
		var team = parameters[0] || "";

		request(url, function (error, response, body) {
			var games = JSON.parse(body).data.games.game;

			gameFound = false;
			games.forEach(function (game){
				var gameObj = new Game(game)

				console.log(game.linescore)

				if(gameObj.hasTeam(team)) {
					gameFound = true;
					
					var message = gameObj.title() + "\n"	+ gameObj.currentInning() + "\n" +gameObj.scoreDifferential()		
					callback(true, message)
				}
			})

			if (!gameFound)
				callback(false, "Game not found for " + team + ".")
		})			
	}
}

var date = new Date();
var url = "http://gdx.mlb.com/components/game/mlb/year_" + date.getFullYear() + "/month_" + pad(date.getMonth() + 1) + "/day_" + pad(date.getDate()) + "/master_scoreboard.json"

function pad(n){
	return n > 9 ? "" + n: "0" + n;
}

