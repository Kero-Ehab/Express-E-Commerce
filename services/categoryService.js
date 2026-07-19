const CategoryModel = require('../models/categoryModel')
const ApiError = require('../utils/apiError')
const factory = require('./handlersFactory')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const sharp = require('sharp')
const asynchandler = require('express-async-handler')
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware')


exports.uploadCategoryImage = uploadSingleImage('image')
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
