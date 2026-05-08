const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const SubCategoryModel = require('../models/subCategoryModel');
const ApiFeatures = require('../utils/apiFeatures');
const factory = require('./handlersFactory')



 exports.setCategoryIdToBody = (req, res, next)=>{
    if(!req.body.category){
        req.body.category = req.params.categoryId;
    }
    next();
}


exports.createFilterObject = (req, res, next)=>{
    let filterObject ={};
    if(req.params.categoryId){
        filterObject = {category: req.params.categoryId}
    }
    req.filterObject = filterObject
    next();
}


exports.getSubCategories = asyncHandler(async(req, res) =>{
   //building query
    const documentsCount = await SubCategoryModel.countDocuments();
    const apiFeatures = new ApiFeatures(SubCategoryModel.find(), req.query)
    .filter()
    .search('Categories')
    .limitFields()
    .sort()
    .pagination(documentsCount)
      
    const {mongooseQuery, paginateResult} = apiFeatures
    const subCategories = await mongooseQuery
    res.status(200).json({result: subCategories.length, paginateResult, data: subCategories})
})

exports.getSubCategory = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const subCategory = await SubCategoryModel.findById(id).populate({path: 'category', select: 'name'})    
    if(!subCategory){
        //res.status(404).json({msg: 'No category for this id'})
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: subCategory})
})

exports. createSubCategory = factory.createOne(SubCategoryModel);

exports.updateSubCategory = factory.updateOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);

