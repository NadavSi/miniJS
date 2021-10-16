const mongoose = require("mongoose");

const JSFileModel = mongoose.Schema({
  filename: {
    type: String,
    default: "",
  },
  minfilename: {
    type: String,
    default: "",
  },
  userid: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
}, {collection: 'files' });

JSFileModel.method('transform', function () {
  var obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});
module.exports = mongoose.model('JsFile', JSFileModel);