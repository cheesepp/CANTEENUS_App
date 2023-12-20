// app.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const path = require('path')
const ErrorHandler = require("./middleware/error");
require('dotenv').config()
const app = express();
var cors = require('cors');
// app.use(cors({origin: ['http://localhost:3000'],
// credentials: true,
// methods: ["GET", "POST", "PUT", "DELETE"],}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));
const PORT = process.env.PORT || 8080;

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
// it's for errorHandeling
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
