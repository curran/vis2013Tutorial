// A simple static file server for development use.
// By Curran Kelleher 10/3/2013
//
// Run with the command "node server.js".
// First install Express with the command "npm install express".
// First install Node.js, see https://github.com/joyent/node/wiki/Installation
var port = 8000,
    fs = require('fs'),
    express = require('express'),
    app = express();

app.use(express.bodyParser());
app.use('/', express.static(__dirname));
app.use(express.directory(__dirname));

// Saves the example source code back into the example file.
// This is called by the examples loaded into "ide.html".
app.post('/examples/save/:exampleName', function(req, res){
  var code = req.body.code,
      exampleName = req.params.exampleName,
      path = 'examples/' + exampleName + '.html';

  fs.writeFile(path, code, function(err) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      console.log('Saved ' + path);
      res.send('Saved ' + path);
    }
  }); 
});

app.listen(port);
console.log('Now serving http://localhost:' + port);
