var express = require("express");
var path = require("path");
var session = require('express-session');
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
app.use(session({secret:'shhhhhhhbasdkfakdnfkadnflk'}));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// static content 
app.use(express.static(path.join(__dirname, "./client/static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
require('./server/config/mongoose');

var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})

