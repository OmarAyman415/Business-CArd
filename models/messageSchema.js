const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  userid: String, 
});
const message = mongoose.model("message", messageSchema);
module.exports = message;
