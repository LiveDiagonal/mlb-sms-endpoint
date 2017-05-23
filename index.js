require('dotenv').config()

var express = require('express')
var app = express()

var processCommand = require('./lib/process_command')

app.set('port', (process.env.PORT || 5000))

app.get('/execute', function(request, response) {
  processCommand(request.query.command)
    .then(function (message) {
      response.json({ message: message })
    })
    .catch(function (message) {
      response.json({ message: message })
    })
 })

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
})