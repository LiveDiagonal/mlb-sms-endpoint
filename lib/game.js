function Game (gameData) {
  this.gameData = gameData;
}


Game.prototype.title = function () {
  return this.gameData.away_name_abbrev + " @ " + this.gameData.home_name_abbrev 
}


Game.prototype.hasTeam = function (team) {
  matchProps = ["team_name", "code", "name_abbrev", "team_city"]

  var has = false;
  ["home", "away"].forEach(function (homeOrAway) {
    matchProps.forEach(function (prop) {
      if (this.gameData[homeOrAway + "_" + prop].toLowerCase() == team) {
        has = true
      }
    }, this)
  }, this)
  

  return has;
}


Game.prototype.isHomeTeam = function (team) {
  matchProps = ["team_name", "code", "name_abbrev", "team_city"]

  var has = false;
  ["home"].forEach(function (homeOrAway) {
    matchProps.forEach(function (prop) {
      if (this.gameData[homeOrAway + "_" + prop].toLowerCase() == team) {
        has = true
      }
    }, this)
  }, this)

  return has;
}


Game.prototype.currentInning = function () {
  if (this.gameData.status == "Final")
    return "Final"

  return (this.gameData.status.top_inning == "Y" ? "Top" : "Bot") + " " + this.gameData.status.inning
}


Game.prototype.scoreDifferential = function () {
  return Math.abs(this.gameData.linescore.r.home - this.gameData.linescore.r.away)
}

module.exports = Game
