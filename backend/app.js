// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const path = require('path')
const mongoose = require('mongoose');
const ErrorHandler = require("./middleware/error");
require('dotenv').config()
var cors = require('cors');
const http = require('http');
const moment = require('moment-timezone');
const multer = require('multer');
// Set the default timezone to GMT+7
moment.tz.setDefault('Asia/Ho_Chi_Minh');
const initSocketIO = require('./controllers/socket'); // Adjust the path based on your project structure

app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));

const upload = multer();
app.use(upload.any());
const uri = 'mongodb+srv://canteenus:canteenus123@cluster0.oafqocm.mongodb.net/canteenus?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const server = http.createServer(app);

// ... (define your mongoose schema and model here)

// // Initialize Socket.IO
// initSocketIO(server);
const socketIO = require('socket.io');
const Chat = require('./models/chat'); // Make sure to adjust the path based on your project structure

const io = socketIO(server);
io.on('connection', (socket) => {
  console.log('vào đây')
  console.log('A user connected');

  // Send existing messages when a user connects
  Chat.find().sort({ timestamp: 1 }).exec().then((messages) => {
    socket.emit('initialMessages', messages);
  })
  .catch((err) => {throw err})

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

const PORT = process.env.PORT || 8080;

const authRoutes = require('./routes/authenticate');
const adminRoutes = require('./routes/admin')
const billRoutes = require('./routes/bill');
const userRoutes = require('./routes/user')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//app.use(express.json())
//app.use(express.urlencoded({ extended: true }));

// Sync Sequelize Models with Database
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error syncing database:', err);
});



// const adminControllerStaff2 = require('./controllers/admin/man_staff2');
// //app.post('/add-staff',  adminControllerStaff2.addStaff);// isAuthenticatedUser,avtUpload.single('image'),
// app.post('/add-staff2',  async (req,res)=> {
//   console.log(req.body)
//   res.json({
//     msg: "success"
//   })
// });

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.use('/bill', billRoutes)
app.use('/user',userRoutes)

const testRoutes = require('./routes/testing')
app.use('/test',testRoutes)
// it's for errorHandeling
app.use(ErrorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
