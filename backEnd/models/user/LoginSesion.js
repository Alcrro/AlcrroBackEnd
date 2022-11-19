const mongoose = require('mongoose');

const loginSessionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  loginAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('loginSession', loginSessionSchema);
