// A simple static file server for development use,
// with additional middleware that saves the example
// HTML files as they are edited inside the slideshow page.
//
// First install Node.js, see https://github.com/joyent/node/wiki/Installation
// Then install Express with the command "npm install express".
// Run with the command "node server.js".
//
// Curran Kelleher 10/3/2013
var port = 8000,
    fs = require('fs'),
    express = require('express'),
    app = express();

// bodyParser is needed to extract data from the POST requests.
app.use(express.bodyParser());

// Serve static files.
app.use('/', express.static(__dirname));

// Serve directory listings at directory URLs.
app.use(express.directory(__dirname));

// Saves the example source code back into the example file.
// This is called by the examples loaded into "ide.html"
// after the content has been edited.
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
