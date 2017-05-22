
/**
 * Module dependencies.
 * @private
 */

var commandFns = require('./commands')

/**
 * Module exports.
 */

module.exports = processCommand

/**
 * Parse and execute a command.
 *
 * @param {string} commandStr
 * @return {Promise}
 * @public
 */

function processCommand (commandStr) {
  var promise = new Promise(
    function(resolve, reject) {
      var commandObj = parseCommand(commandStr)
      var commandFn = commandFns[commandObj.command]

      if (commandFn !== undefined) {
        resolve(commandFn(commandObj.parameters))
      } else {
        reject("Command " + commandObj.commmand + " not found.")
      }

    }
  )

  return promise;
}

/**
 * Parse a command.
 *
 * @param {string} command
 * @return {object}
 * @private
 */

var parseCommand = function (command) {
  var matches = command.toLowerCase().match(/(\w+)\s*(.*)/)
  
  return {
    command: (matches && matches.length > 1) ? matches[1] : null,
    parameters: (matches && matches.length > 2) ? matches[2].split(/\s+/) : null,
  }
}