const CategoryModel = require('../models/categoryModel')
const ApiError = require('../utils/apiError')
const factory = require('./handlersFactory')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const sharp = require('sharp')
const asynchandler = require('express-async-handler')


// const multerStorage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'upload/categories')
//     },
//     filename: function(req, file, cb){
//         const ext = file.mimetype.split('/')[1];
//         const uniqueSuffix = uuidv4();
//         const filename = `category-${uniqueSuffix}-${Date.now()}.${ext}` 
//         cb(null, filename)
//     }
// })
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }else{
        cb(new ApiError('Only images are allowed', 400), false)
    }

}



const upload = multer({storage: multerStorage, fileFilter:multerFilter })     

exports.uploadCategoryImage = upload.single('image')

exports.resizeImage = async (req, res, next)=>{
    const uniqueSuffix = uuidv4();
    const filename = `category-${uniqueSuffix}-${Date.now()}.jpeg` 
    if(!req.file)return next();
    await sharp(req.file.buffer)
    .resize(600,600)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`upload/categories/${filename}`)
    req.body.image = filename;
    next();
}

exports.getCategories = factory.getAll(CategoryModel)
exports.getCategory = factory.getOne(CategoryModel)
exports.createCategory = factory.createOne(CategoryModel)
exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);
