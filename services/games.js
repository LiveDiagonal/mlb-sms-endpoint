var request = require('request');

module.exports = {
	todaysGame: function (parameters, callback) {
		var team = parameters[0] || "";

		request(url, function (error, response, body) {
			var games = JSON.parse(body).data.games.game;

			gameFound = false;
			games.forEach(function (game){
				if (game.home_team_name.toLowerCase() == team.toLowerCase() || game.home_code.toLowerCase() == team.toLowerCase() || game.home_name_abbrev.toLowerCase() == team.toLowerCase() ||  game.away_team_name.toLowerCase() == team.toLowerCase() || game.away_code.toLowerCase() == team.toLowerCase() || game.away_name_abbrev.toLowerCase() == team.toLowerCase()) {
					gameFound = true;
					callback(true, game.game_media.media.title + ", " + game.time + " " + game.time_zone) ;
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
				if (game.home_team_name.toLowerCase() == team.toLowerCase() || game.home_code.toLowerCase() == team.toLowerCase() || game.home_name_abbrev.toLowerCase() == team.toLowerCase() ||  game.away_team_name.toLowerCase() == team.toLowerCase() || game.away_code.toLowerCase() == team.toLowerCase() || game.away_name_abbrev.toLowerCase() == team.toLowerCase()) {
					gameFound = true;
					var status = (game.status.top_inning == "Y" ? "Top" : "Bot") + " " + game.status.inning + " S:" + game.status.s + " B:" + game.status.b + " O:" + game.status.o + ", " +
						game.home_name_abbrev + " R:" + game.linescore.r.home + " H:" + game.linescore.h.home + " E:" + game.linescore.e.home + ", " +
					  game.away_name_abbrev + " R:" + game.linescore.r.away + " H:" + game.linescore.h.away + " E:" + game.linescore.e.away;

					callback(true, status)
				}
			})

			if (!gameFound)
				callback(false, "Game not found for " + team + ".")
		});			
	}
}

var date = new Date();
var url = "http://gdx.mlb.com/components/game/mlb/year_" + date.getFullYear() + "/month_" + pad(date.getMonth() + 1) + "/day_" + pad(date.getDate()) + "/master_scoreboard.json"

function pad(n){
	return n > 9 ? "" + n: "0" + n;
}