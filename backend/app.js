// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const authRoutes = require('./routes/authenticate');
const path = require('path')
const ErrorHandler = require("./middleware/error");
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// Sync Sequelize Models with Database
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Routes
app.use('/auth', authRoutes);

// it's for errorHandeling
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
