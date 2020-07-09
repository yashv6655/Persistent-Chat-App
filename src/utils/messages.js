const mongoose = require("mongoose");
const { Message } = require("../models/messageModel");
const { Room } = require("../models/roomModel");
const moment = require("moment");
require("../db");

const generateMessage = (username, text, roomCode) => {
  // Get message send time and date
  const time = moment(new Date().getTime()).format("h:mm a");
  const date =
    new Date().getMonth() +
    1 +
    "/" +
    new Date().getDate() +
    "/" +
    new Date().getFullYear();

  // Create the new message
  const newMessage = new Message({
    username,
    message: text,
    timeSent: time + " " + date,
    roomCode,
  });

  // Find the room code
  Room.findOne(
    {
      roomCode: roomCode,
    },
    (err, doc) => {
      // If room exists, push newMessage. Else, create room and add message
      if (doc) {
        Room.findOneAndUpdate(
          {
            roomCode: roomCode,
          },
          {
            $push: {
              messages: newMessage,
            },
          },
          (err, doc) => {
            if (!err) doc.save();
            else console.log("There was an error updating to database.");
          }
        );
      } else {
        const newRoom = new Room({
          roomCode,
          messages: newMessage,
        });

        newRoom.save((err) => {
          if (err) console.log(err);
        });
      }
    }
  );

  return {
    username,
    text,
    createdAt: new Date().getTime(),
    createdDate: date,
  };
};

const generateLocationMessage = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
    createdDate:
      new Date().getMonth() +
      1 +
      "/" +
      new Date().getDate() +
      "/" +
      new Date().getFullYear(),
  };
};

const getMessages = (roomCode) => {
  // Crete the message variables
  let roomMessages = (usernames = messages = timesSent = []);
  // Find the room based on roomCode
  Room.findOne(
    {
      roomCode,
    },
    (err, doc) => {
      if (err) throw err;
      else {
        roomMessages = doc.messages;

        for (var i = 0; i < roomMessages.length; i++) {
          usernames.push(roomMessages[i].username);
          messages.push(roomMessages[i].message);
          timesSent.push(roomMessages[i].timeSent);
        }
        //console.log(doc);
        //console.log(roomMessages[1].username);
      }
    }
  );
  return {
    usernames,
    messages,
    timesSent,
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage,
};
