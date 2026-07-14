const ProductModel = require('../models/productModel')
const factory = require('./handlersFactory')

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

exports.getProducts = factory.getAll(ProductModel, 'Products')

exports.getProduct = factory.getOne(ProductModel)

exports.createProduct = factory.createOne(ProductModel)
    
exports.updateProduct = factory.updateOne(ProductModel);

exports.deleteProduct = factory.deleteOne(ProductModel)












