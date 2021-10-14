const JSFile = require("../models/jsfile");

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
  let jsfile = new JSFile(req.body);
  jsfile.domainid = jsfile.name.replace(' ', '-');
  jsfile
    .save()
    .then((jsfile) => {
      jsfilesLog.info("new jsfile (" + jsfile.name + ") created");
      res.status(201).json({
        message: "JSFile created!",
        status: 1,
        jsfile: jsfile.transform()
      });
    })
    .catch((err) => {
      jsfilesLog.error("registration failed. ERROR: " + err);
      res.status(500).json({
        message: "Authentication failed"
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
