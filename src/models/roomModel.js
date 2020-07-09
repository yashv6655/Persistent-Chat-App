const mongoose = require("mongoose");
const { MessageSchema } = require("./messageModel");

const RoomSchema = new mongoose.Schema({
  roomCode: String,
  messages: [MessageSchema],
});

const Room = new mongoose.model("Room", RoomSchema);

module.exports = { Room };
