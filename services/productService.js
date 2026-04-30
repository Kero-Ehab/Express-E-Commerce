
const ProductModel = require('../models/productModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const CategoryModel = require('../models/categoryModel')

/*

exports.getProducts = asyncHandler(async(req, res) =>{

    console.log(req.query)
    
    const queryStringObj = {...req.query};
    const excludesFields = ['page', 'sort', 'limit', 'fields'];
    for (let i = 0; i < excludesFields.length; i++) {
        delete queryStringObj[excludesFields[i]];
    }

    // let queryStr = JSON.stringify(queryStringObj);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`)
    // // convert numeric strings to numbers inside JSON string
    // queryStr = queryStr.replace(/"(\d+)"/g, (match, p1) => {
    //     return Number(p1);
    // });

    console.log(queryStr)    
    console.log(queryStringObj)
    console.log(JSON.parse(queryStr))

    const page = req.query.page * 1 || 1 ; 
    const limit = req.query.limit * 1 || 5;
    const skip = (page-1)*limit 

    const mongooseQuery =  ProductModel
    .find(queryStringObj)
    .skip(skip).limit(limit)
    .populate({path:'category',select:'name'})
    

    const products = await mongooseQuery      
    res.status(200).json({result: products.length, page, data: products})
})

*/

exports.getProducts = asyncHandler(async (req, res) => {

    const queryStringObj = { ...req.query };
    const excludesFields = ['page', 'sort', 'limit', 'fields'];
    for (let i = 0; i < excludesFields.length; i++) {
        delete queryStringObj[excludesFields[i]];
    }
    const mongoQuery = {};

    for (let key in queryStringObj) {

        if (key.includes('[')) {

            const field = key.split('[')[0];
            const operator = key.match(/\[(.*)\]/)[1];

            if (!mongoQuery[field]) mongoQuery[field] = {};

            mongoQuery[field]['$' + operator] = Number(queryStringObj[key]);

        } else {
            mongoQuery[key] = isNaN(queryStringObj[key])
                ? queryStringObj[key]
                : Number(queryStringObj[key]);
        }
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;


    let mongooseQuery = ProductModel
        .find(mongoQuery)
        .skip(skip)
        .limit(limit)
        .populate({ path: 'category', select: 'name' });

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        mongooseQuery = mongooseQuery.sort(sortBy);
    }else{
        mongooseQuery = mongooseQuery.sort('-createdAt');
    }

    const products = await mongooseQuery;

    res.status(200).json({
        result: products.length,
        page,
        data: products
    });
});



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