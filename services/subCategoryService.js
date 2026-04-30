const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')

const SubCategoryModel = require('../models/subCategoryModel');


 exports.setCategoryIdToBody = (req, res, next)=>{
    if(!req.body.category){
        req.body.category = req.params.categoryId;
    }
    next();
}

exports. createSubCategory = asyncHandler(async(req, res) =>{
        const {name,category} = req.body;
        const subCategory = await SubCategoryModel.create({
        name,
        slug: slugify(name),
        category: category,
    })
    res.status(201).json({data: subCategory})
})

exports.createFilterObject = (req, res, next)=>{
    let filterObject ={};
    if(req.params.categoryId){
        filterObject = {category: req.params.categoryId}
    }
    req.filterObject = filterObject
    next();
}
exports.getSubCategories = asyncHandler(async(req, res) =>{
    const page = req.query.page * 1 || 1 ; 
    const limit = req.query.limit * 1 || 5;
    const skip = (page-1)*limit 
    
    const subCategories = await SubCategoryModel.find(req.filterObject).skip(skip).limit(limit).populate({path: 'category', select: 'name'})
    res.status(200).json({result: subCategories.length, page, data: subCategories})
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



exports.updateSubCategory = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const {name,category} = req.body;
    const subCategory = await SubCategoryModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name), category: category}, {new: true})
    if(!subCategory){
        //res.status(404).json({msg: 'No category for this id'})
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: subCategory})
})

exports.deleteSubCategory = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const subCategory = await SubCategoryModel.findOneAndDelete({_id: id})
    if(!subCategory){
        //res.status(404).json({msg: 'No category for this id'})
        return next(new ApiError(`No category for this ${id}`, 404))
    }
    res.status(200).json({data: subCategory})
})