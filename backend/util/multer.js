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

const avtUpload = multer({ storage: avtStorage })

const itemStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/items/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
  });
  

const itemUpload = multer({ storage: itemStorage });

const ingredientStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/ingredients/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
  });
  

const ingredientUpload = multer({ storage: ingredientStorage });

module.exports = {
    avtUpload: avtUpload,
    itemUpload: itemUpload,
    ingredientUpload: ingredientUpload,
};