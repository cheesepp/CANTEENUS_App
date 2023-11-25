const multer = require('multer');

const avtStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avts/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  },
});

const avtUpload = multer({ avtStorage })

const foodStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/foods/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
  });
  

const foodUpload = multer({ foodStorage });

const materialStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/materials/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
  });
  

const materialUpload = multer({ materialStorage });

module.exports = {
    avtUpload,
    foodUpload,
    materialUpload
};