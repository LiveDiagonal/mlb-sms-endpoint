
/**
 * Module dependencies.
 * @private
 */

var request = require('request-promise')
var Game = require('./game')

/**
 * Module exports.
 */

module.exports = {
	"game": todaysGame,
	"score": score,
	"diff": scoreDifferential
}

/**
 * Look up today's game.
 *
 * @param {Array} parameters
 * @return {Promise}
 * @public
 */

function todaysGame(parameters) {
	var team = parameters[0] || "";

	var promise = new Promise(
		function(resolve, reject) {
			request({
				uri: url,
				json: true
			})
				.then(function (body) {
					var game = findGame(body.data.games.game, team)

					if (game)
						resolve(game.title() + "\n" + game.gameData.time + " " + game.gameData.time_zone)
					else
						reject("Game not found for " + team + ".")
				})
		}
	)

	return promise;
}

/**
 * Look up game's score.
 *
 * @param {Array} parameters
 * @return {Promise}
 * @public
 */

function score(parameters) {
	var team = parameters[0] || "";

	var promise = new Promise(
		function(resolve, reject) {
			request({
				uri: url,
				json: true
			})
				.then(function (body) {
					var game = findGame(body.data.games.game, team)

					if (game) {
						resolve(game.title() + "\n" +
							game.currentInning() + " B:" + game.gameData.status.b + " O:" + game.gameData.status.o + "\n" +
							game.gameData.home_name_abbrev + " R:" + game.gameData.linescore.r.home + " H:" + game.gameData.linescore.h.home + " E:" + game.gameData.linescore.e.home + "\n" +
							game.gameData.away_name_abbrev + " R:" + game.gameData.linescore.r.away + " H:" + game.gameData.linescore.h.away + " E:" + game.gameData.linescore.e.away)
					}
					else
						reject("Game not found for " + team + ".")
				})
		}
	)

	return promise;
}

/**
 * Look up game's score differential.
 *
 * @param {Array} parameters
 * @return {Promise}
 * @public
 */

function scoreDifferential(parameters) {
	var team = parameters[0] || "";

	var promise = new Promise(
		function(resolve, reject) {
			request({
				uri: url,
				json: true
			})
				.then(function (body) {
					var game = findGame(body.data.games.game, team)

					if (game)
						resolve(game.title() + "\n"	+ game.currentInning() + "\n" + game.scoreDifferential())
					else
						reject("Game not found for " + team + ".")
				})
		}
	)

	return promise;
}

/**
 * Look up today's game.
 *
 * @param {object} gamesData
 * @param {string} team
 * @return {Game}
 * @private
 */

function findGame(gamesData, team) {
	var foundGame = false;

	gamesData.forEach(function (game) {
		var gameObj = new Game(game)

		if (gameObj.hasTeam(team)) 
			foundGame = gameObj;
	})

	return foundGame;
}


var date = new Date();
var url = "http://gdx.mlb.com/components/game/mlb/year_" + date.getFullYear() + "/month_" + pad(date.getMonth() + 1) + "/day_" + pad(date.getDate()) + "/master_scoreboard.json"

function pad(n){
	return n > 9 ? "" + n: "0" + n;
}

