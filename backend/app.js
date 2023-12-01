// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const path = require('path')
const ErrorHandler = require("./middleware/error");
require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authenticate');
const billRoutes = require('./routes/authenticate');

app.use(bodyParser.json());

// Sync Sequelize Models with Database
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('bill', )

// it's for errorHandeling
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
