const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timeSent: String,
  roomCode: String,
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = {
  Message,
  MessageSchema,
};
