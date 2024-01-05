// controllers/materialController.js
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const { Ingredient } = require('../../models/relationship');
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
const ErrorHandler = require('../../util/ErrorHandler')
const { formatLocaleTimezone } = require('../../util/DateTime')
const { moveImageFile, deleteFilesInFolder, deleteFolder, createFolderIfNotExists} = require('../../util/fileUtility')
const fs = require('fs')

// Get all ingredients
exports.getAllIngredients = catchAsyncErrors(async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json({ success:true,  ingredients: ingredients });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Get a single ingredient by ID
exports.getIngredientByID = catchAsyncErrors(async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return next(new ErrorHandler('Ingredient not found!', 404));
    }

    res.json({ success:true, ingredient: ingredient });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Add a new Ingredient
exports.addIngredient = catchAsyncErrors(async (req, res) => {
  try {
    console.log("add ingredient")
    const { calories, name, unit, quantity, price, expirationDate } = req.body;
    console.log("req.body: ",req.body)

    
    const ingredient = await Ingredient.create({
      calories,
      name,
      unit,
      quantity,
      price,
      expirationdate: formatLocaleTimezone(expirationDate),
    });

    const files = req.files
    const destinationPath =  'uploads\\ingredients\\'+ingredient.id+'\\'

    fs.mkdir(destinationPath, (err) => {
      if (err) {
        console.error(err);
        } else {
        
        console.log('Folder created successfully');
        }

      let count=0;
        if (files.length!==0) {
            files.forEach(file => {
                    const sourcePath = file.path; 
                    let destinationFile = destinationPath+file.filename
                    if (count == 0 ){
                        destinationFile = destinationPath+'main.jpg';
                    } else {
                        destinationFile = destinationPath+'main_thumbs'+count+'.jpg';
                    }

                    moveImageFile(sourcePath, destinationFile, (err) => {
                    if (err) {
                        console.error(err);
                        console.log('Failed to move the image file')
                        //res.status(500).json({ error: 'Failed to move the image file' });
                    } else {
                        console.log('Image file moved successfully')
                        //res.json({ message: 'Image file moved successfully' });
                    }
                    });
                    count++;
                });
    }})

    await ingredient.update({
      image: files[0]
    })

    res.status(201).json({ success: true, message: 'Ingredient added successfully', ingredient: ingredient });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Update a ingredient by ID
exports.updateIngredient = catchAsyncErrors( async (req, res,next) => {
  try {
    console.log('update ingredient')
    const { id } = req.params;
    const { calories, name, unit, quantity, price, expirationDate } = req.body.data;

    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    await ingredient.update({
      calories,
      name,
      unit,
      quantity,
      price,
      expirationdate: formatLocaleTimezone(expirationDate),
    });

    console.log("req.body: ", req.body)
    const file = req.file;
    console.log("files: ", file)
    const destinationPath =   'uploads\\ingredients\\'+ingredient.id+'\\'

    createFolderIfNotExists(destinationPath);

    let count=0;
    // if (file) {
    //             deleteFilesInFolder(destinationPath, (err) => {
    //                 if (err) {
    //                     console.error(err);
    //                     console.log('Failed to delete files in the folder');
    //                 } else {
    //                     console.log('Files deleted successfully');
    //                 }

    //                 files.forEach(file => {
    //                     const sourcePath = file.path; 
    //                     let destinationFile = destinationPath+file.filename
    //                     if (count == 0 ){
    //                         destinationFile = destinationPath+'main.jpg';
    //                     } else {
    //                         destinationFile = destinationPath+'main_thumbs'+count+'.jpg';
    //                     }
    //                     moveImageFile(sourcePath, destinationFile, (err) => {
    //                     if (err) {
    //                         console.error(err);
    //                         console.log('Failed to move the image file')
    //                         //res.status(500).json({ error: 'Failed to move the image file' });
    //                     } else {
    //                         console.log('Image file moved successfully')
    //                         //res.json({ message: 'Image file moved successfully' });
    //                     }
    //                     });
    //                     count++;
    //                 });
    //             });
                
    //     }
      
    // await ingredient.update({
    //   image: files[0]
    // })

    res.json({ success:true, message: 'Ingredient updated successfully', ingredient: ingredient});
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

// Delete a ingredient by ID
exports.deleteIngredient = catchAsyncErrors( async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findByPk(id);

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    await ingredient.destroy();

    const destinationPath =  'uploads\\ingredients\\'+ingredient.id+'\\'
    deleteFilesInFolder(destinationPath, (err) => {
        if (err) {
            console.error(err);
            console.log('Failed to delete files in the folder');
        } else {
            console.log('Files deleted successfully');
        }
        deleteFolder(destinationPath, (err)=> {
            if (err) {
            console.log(err)
            console.log('Failed to delete folder');
            } else {
                console.log('Folder deleted successfully');
            }

        })
    })
    
    res.json({ success:true, message: 'Ingredient deleted successfully' });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler('Internal server error!', 500));
  }
})

//Helper for adding ingredient to item
exports.getIngredientByName = async (inName) => {
  try {
    const ingredient = await Ingredient.findOne({
      where: {
        name: inName,
      }
    });

    if (!ingredient) {
      console.error('Ingredient not found!');
      return null;
    }

    return ingredient;
  } catch (error) {
    console.error(error);
    return null;
  }
}
