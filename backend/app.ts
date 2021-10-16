var createError = require('http-errors');
var express = require('express');
let cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //needed for files upload
const fs = require('fs');
let mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

var app = express(); 

// mongoose.connect(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
//   .then(() => {
//     console.log('connected to db');
//   })
//   .catch(() => {
//     console.log('failed to connect');
//   });
// mongoose.set('debug', true);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); 
// app.use(express.static(path.join(__dirname, 'public')));

//set all avaiable routes
let routePath = './routes/';
fs.readdirSync(routePath).forEach(function(file) {
  const route = routePath + file;
  app.use('/' + file.replace('.js', ''), require(route));
});

app.listen(process.env.PORT || 3000, '127.0.0.1', function() {
  console.log('init server'); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
