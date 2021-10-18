const JSFile = require("../models/jsfile");
const minify = require('@node-minify/core');
const terser = require('@node-minify/terser');
const formidable = require("formidable");
const fsReader = require("fs");

const JSFilesLogger = require("beauty-logger");
const serverPath = require("path");
const fs = require("file-system")
fs.writeFile(serverPath.join(process.cwd(), "/logs/jsfiles/jsfilesInfoLog.log"), '')
fs.writeFile(serverPath.join(process.cwd(), "/logs/jsfiles/jsfilesErrorLog.log"), '')
const jsfilesLog = new JSFilesLogger({
  //max size of per log file, default: 10MB 
  logFileSize: 1024 * 1024 * 5,
  logFilePath: {
    //log file name, default: as follows
    info: serverPath.join(process.cwd(), "/logs/jsfiles/jsfilesInfoLog.log"),
    error: serverPath.join(process.cwd(), "/logs/jsfiles/jsfilesErrorLog.log")
  },
  //enable data type warn, default: false
  dataTypeWarn: false,
  //disable print log in console, default: false
  productionModel: false,
  //only print log in console, default: false
  onlyPrintInConsole: false,
});

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

// insert new jsfile
exports.createJSFile = (req, res, next) => {
  let parsed = '';
  var form = formidable({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      jsfilesLog.error('ERROR: ' + err);
      next(err);
      return;
    }
    jsfilesLog.info('compressing file: ' + files.jsfileUpload.name);
    const tempname = files.jsfileUpload.name.replace('.js', '_' + makeid(10) + '.tmp.js');
    minify({
      compressor: terser,
      input: files.jsfileUpload.path,
      output: 'uploads/' + tempname,
      toplevel: true,
      parse: {
        drop_console: true,
        hoist_funs: true 
      },
      callback: function (err, min) {
        jsfilesLog.info('created temp file: ' + tempname);
        fsReader.unlinkSync('uploads/' + tempname);
        if (err) {
          jsfilesLog.error('compression failed on file: ' + files.jsfileUpload.name + ', ERROR: ' + err);
          res.status(200).json({
            status: 0,
            compressedData: '',
            error: err
          });
        } else {
          jsfilesLog.info('compression success on file: ' + files.jsfileUpload.name);
          res.status(200).json({
            status: 1,
            compressedData: min
          });
        }
      }
    });
  });
};
