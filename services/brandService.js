
const brandModel = require('../models/brandModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')



exports.getBrands = asyncHandler(async(req, res) =>{
    const page = req.query.page * 1 || 1 ; 
    const limit = req.query.limit * 1 || 5;
    const skip = (page-1)*limit 
    const brands = await brandModel.find().skip(skip).limit(limit)
    res.status(200).json({result: brands.length, page, data: brands})
})

exports.getBrand = asyncHandler(async(req, res, next) =>{
    const brand = await brandModel.findById(req.params.id)    
    if(!brand){
        //res.status(404).json({msg: 'No brandy for this id'})
        return next(new ApiError(`No brandy for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: brand})
})

exports.createBrands = asyncHandler(async (req, res) =>{
    const name = req.body.name;
    
        const brand = await brandModel.create({name, slug: slugify(name)})
        res.status(201).json({data: brand})
})
    
exports.updateBrands = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const {name} = req.body;
    const brand = await brandModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true})
    if(!brand){
        //res.status(404).json({msg: 'No brand for this id'})
        return next(new ApiError(`No brand for this ${id}`, 404))
    }
    res.status(200).json({data: brand})
})

exports.deleteBrand = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const brand = await brandModel.findByIdAndDelete(id)
    if(!brand){
        // res.status(404).json({msg: 'No Brand for this id'})
        return next(new ApiError(`No Brand for this ${id}`, 404))
    }
    res.status(200).json({msg: 'Brand deleted successfully'})
})