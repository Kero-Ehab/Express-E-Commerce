const CategoryModel = require('../models/categoryModel')
const factory = require('./handlersFactory')
const multer = require('multer')
const {v4: uuidv4} = require('uuid')



const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload/categories')
    },
    filename: function(req, file, cb){
        const ext = file.mimetype.split('/')[1];
        const uniqueSuffix = uuidv4();
        const filename = `category-${uniqueSuffix}-${Date.now()}.${ext}` 
        cb(null, filename)
    }
})

const upload = multer({storage: multerStorage})     

exports.uploadCategoryImage = upload.single('image')

exports.getCategories = factory.getAll(CategoryModel)
exports.getCategory = factory.getOne(CategoryModel)
exports.createCategory = factory.createOne(CategoryModel)
exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);
