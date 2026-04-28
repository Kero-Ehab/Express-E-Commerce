
const ProductModel = require('../models/productModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const CategoryModel = require('../models/categoryModel')



exports.getProducts = asyncHandler(async(req, res) =>{
    const page = req.query.page * 1 || 1 ; 
    const limit = req.query.limit * 1 || 5;
    const skip = (page-1)*limit 
    const products = await ProductModel.find({}).skip(skip).limit(limit).populate({path:'category',select:'name'})    
    res.status(200).json({result: products.length, page, data: products})
})

exports.getProduct = asyncHandler(async(req, res, next) =>{
    const product = await ProductModel.findById(req.params.id).populate({path:'category',select:'name'})    
    if(!product){
        //res.status(404).json({msg: 'No product for this id'})
        return next(new ApiError(`No product for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: product})
})

exports.createProduct = asyncHandler(async (req, res) =>{
    req.body.slug = slugify(req.body.title);
    const product = await ProductModel.create(req.body)
    res.status(201).json({data: product})
})
    
exports.updateProduct = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    const product = await ProductModel.findOneAndUpdate({_id: id}, req.body, {new: true})
    if(!product){
        //res.status(404).json({msg: 'No product for this id'})
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({data: product})
})

exports.deleteProduct = asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const product = await ProductModel.findByIdAndDelete(id)
    if(!product){
        // res.status(404).json({msg: 'No product for this id'})
        return next(new ApiError(`No product for this ${id}`, 404))
    }
    res.status(200).json({msg: 'product deleted successfully'})
})