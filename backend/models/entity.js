const mongoose = require("mongoose");

const EntityModel = mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  domainid: {
    type: String,
    default: ''
  },
  identitynum: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  },
});

EntityModel.method('transform', function () {
  var obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});
module.exports = mongoose.model('Entity', EntityModel);