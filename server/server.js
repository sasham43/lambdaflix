var express = require('express');
var index = require('./routes/index.js');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use('/', index);
app.use(express.static('server/public'));

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Server listening on port ' + port + '...');
});
