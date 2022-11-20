const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  checkbox: {
    type: Boolean,
    default: true,
  },
  loginAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    default: new Date(+new Date() + 86400000),
  },
});

module.exports = mongoose.model('loginSession', loginSessionSchema);
