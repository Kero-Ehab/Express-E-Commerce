
const brandModel = require('../models/brandModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')
const factory = require('./handlersFactory')


exports.getBrands = asyncHandler(async(req, res) =>{
     //building query
    const documentsCount = await brandModel.countDocuments();
    const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .pagination(documentsCount)
    .filter()
    .search()
    .limitFields()
    .sort()
  
    const {mongooseQuery, paginateResult} = apiFeatures
    const brands = await mongooseQuery


    res.status(200).json({result: brands.length, paginateResult, data: brands})
})

exports.getBrand = asyncHandler(async(req, res, next) =>{
    const brand = await brandModel.findById(req.params.id)    
    if(!brand){
        //res.status(404).json({msg: 'No brandy for this id'})
        return next(new ApiError(`No brandy for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: brand})
})

exports.createBrands = factory.createOne(brandModel)
    
exports.updateBrands = factory.updateOne(brandModel)


exports.deleteBrand = factory.deleteOne(brandModel)

