
function moveImageFile(sourcePath, destinationPath, callback) {
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
}
function deleteFilesInFolder(folderPath, callback) {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        callback(err);
        return;
      }
  
      files.forEach(file => {
        const filePath = `${folderPath}/${file}`;
  
        fs.unlink(filePath, err => {
          if (err) {
            callback(err);
            return;
          }
        });
      });
  
      callback(null);
    });
  }
  function deleteFolder(folderPath, callback) {
    fs.rmdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null);
    });
  }
  function createFolderIfNotExists(folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Folder created: ${folderPath}`);
    } else {
      console.log(`Folder already exists: ${folderPath}`);
    }
  }

  module.exports = {
    moveImageFile: moveImageFile,
    deleteFilesInFolder: deleteFilesInFolder,
    deleteFolder: deleteFolder,
    createFolderIfNotExists: createFolderIfNotExists,
  }