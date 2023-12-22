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
const adminRoutes = require('./routes/admin')
const billRoutes = require('./routes/bill');
const userRoutes = require('./routes/user')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

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
// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.use('/bill', billRoutes)
app.use('/user',userRoutes)

const testRoutes = require('./routes/testing')
app.use('/test',testRoutes)
// it's for errorHandeling
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
