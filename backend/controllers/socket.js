// socket.js

const socketIO = require('socket.io');
const mongoose = require('mongoose');
const Chat = require('../models/chat'); // Make sure to adjust the path based on your project structure

const initSocketIO = (server) => {
  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('vào đây')
    console.log('A user connected');

    // Send existing messages when a user connects
    Chat.find().sort({ timestamp: 1 }).exec((err, messages) => {
      if (err) throw err;
      //console.log('all msg: ', messages)
      socket.emit('initialMessages', messages);
    });

    // Listen for new messages
    socket.on('sendMessage', async (data) => {
      try {
        console.log(data)
        const { sender, receiver, message } = data;
        const newChatMessage = new Chat({ sender, receiver, message });
        const savedMessage = await newChatMessage.save();

        // Broadcast the new message to all connected clients
        io.emit('newMessage', savedMessage);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = initSocketIO;