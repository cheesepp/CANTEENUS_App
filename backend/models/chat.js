const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
  });

Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat
