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

// get all listed jsfiles  
exports.getJSFiles = (req, res, next) => {
  JSFile.find()
    .then((respJSFiles) => {
      let returnedJSFiles = [];

      for (let i = 0; i < respJSFiles.length; i++) {
        returnedJSFiles.push(respJSFiles[i].transform());
      }
      res.status(200).json({
        jsfiles: returnedJSFiles,
      });
    })
    .catch();
};

// get single jsfile
exports.getJSFile = (req, res, next) => {
  JSFile.findOne({ _id: req.params.id })
    .then((jsfileData) => {
      if (jsfileData) {
        res.status(200).json({ jsfile: jsfileData.transform() });
      } else {
        res.status(404).json({ status: "-1", message: "jsfileData not found!" });
      }
    })
    .catch(err => {
      res.status(201).json({ status: "-1", message: "jsfileData not found!" });
    });
};

// insert new jsfile
exports.createJSFile = (req, res, next) => {
  let parsed = '';
  var form = formidable({ keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      next(err);
      return;
    }
    minify({
      compressor: terser,
      input: files.jsfileUpload.path,
      output: 'bar.js',
      callback: function (err, min) {
        if (err) {
          res.status(200).json({
            status: 0,
            compressedData: '',
            error: err
          });
        } else { 
          res.status(200).json({
            status: 1,
            compressedData: min
          });
        }
      }
    });
  });
};

exports.updateJSFile = (req, res, next) => {
  JSFile.findOneAndUpdate({ _id: req.params.id }, {
    updatedAt: new Date(),
    ...req.body
  })
    .then((jsfileData) => {
      res.status(200).json({ status: "1", message: "jsfileData updated" });
    });
};
