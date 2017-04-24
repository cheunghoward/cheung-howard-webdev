var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
//app.use(session({ secret: process.env.SESSION_SECRET }));


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./assignment/app.js")(app);
require ("./project/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);