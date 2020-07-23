'use strict'

require('dotenv').load();

var http = require('http');
var port = process.env.PORT || 3002;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var routes = require('./server/routes/api');
var path = require('path');
var helmet = require('helmet');

if (process.env.NODE_ENV === 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
	app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.set('views', './views');
app.set('view engine', 'ejs');

http.createServer(app).listen(port, function() {
  console.log("PDF application running on port: " + process.env.APP_PORT);
})
