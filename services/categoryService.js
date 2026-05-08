
const CategoryModel = require('../models/categoryModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')
const factory = require('./handlersFactory')



exports.getCategories = asyncHandler(async(req, res) =>{

    //building query
    const documentsCount = await CategoryModel.countDocuments();
    const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
    .filter()
    .search('Categories')
    .limitFields()
    .sort()
    .pagination(documentsCount)
      
        const {mongooseQuery, paginateResult} = apiFeatures
        const categories = await mongooseQuery;
    
    res.status(200).json({result: categories.length, paginateResult, data: categories})
})

exports.getCategory = asyncHandler(async(req, res, next) =>{
    const category = await CategoryModel.findById(req.params.id)    
    if(!category){
        //res.status(404).json({msg: 'No category for this id'})
        return next(new ApiError(`No category for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: category})
})

exports.createCategory = factory.createOne(CategoryModel)
    
exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCategory = factory.deleteOne(CategoryModel);
