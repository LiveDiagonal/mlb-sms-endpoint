var request = require('request');

var date = new Date();
var url = "http://gdx.mlb.com/components/game/mlb/year_" + date.getFullYear() + "/month_" + pad(date.getMonth() + 1) + "/day_" + pad(date.getDate()) + "/master_scoreboard.json"


module.exports = {
	todaysGame(team = "", callback) {
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
		    	callback(false, "Game not found.")
		});
	}
}

function pad(n){
    return n > 9 ? "" + n: "0" + n;
}