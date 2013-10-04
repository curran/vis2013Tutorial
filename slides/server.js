// A simple static file server for development use.
// By Curran Kelleher 10/3/2013
//
// Run with the command "node server.js".
// First install Express with the command "npm install express".
// First install Node.js, see https://github.com/joyent/node/wiki/Installation
var port = 8000,
    express = require('express'),
    app = express();
app.use('/', express.static(__dirname));
app.listen(port);
console.log('Now serving http://localhost:' + port);
