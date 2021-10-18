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

const apiLogger = require("beauty-logger");
const serverPath = require("path");
const fsLog = require("file-system")
fsLog.writeFile(serverPath.join(process.cwd(), "/logs/api/apiInfoLog.log"), '')
fsLog.writeFile(serverPath.join(process.cwd(), "/logs/api/apiErrorLog.log"), '')
const apiLog = new apiLogger({
  //max size of per log file, default: 10MB 
  logFileSize: 1024 * 1024 * 5,
  logFilePath: {
    //log file name, default: as follows
    info: serverPath.join(process.cwd(), "/logs/api/apiInfoLog.log"),
    error: serverPath.join(process.cwd(), "/logs/api/apiErrorLog.log")
  },
  //enable data type warn, default: false
  dataTypeWarn: false,
  //disable print log in console, default: false
  productionModel: false,
  //only print log in console, default: false
  onlyPrintInConsole: false,
});

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
app.use("/", express.static(path.join(__dirname, 'angularApp')));

//set all avaiable routes
let routePath = './routes/';
fs.readdirSync(routePath).forEach(function(file) {
  const route = routePath + file;
  app.use('/' + file.replace('.js', ''), require(route));
});
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angularApp", "index.html"));
});
console.log(process.env.PORT)
app.listen(process.env.PORT || 3000, function () {
  apiLog.info('init server on port: ' + process.env.PORT);
  // console.log('init server on port: ' + process.env.PORT);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  apiLog.error('ERROR: ' + err.message);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
