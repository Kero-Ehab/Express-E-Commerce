const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware')
const brandModel = require('../models/brandModel')
const factory = require('./handlersFactory')
const sharp = require('sharp')
const {v4: uuidv4} = require('uuid')
const asyncHandler = require('express-async-handler')


exports.uploadBrandImage = uploadSingleImage('image')

exports.resizeImage = asyncHandler(async (req, res, next)=>{
    const uniqueSuffix = uuidv4();
    const filename = `brand-${uniqueSuffix}-${Date.now()}.jpeg` 
    if(!req.file)return next();
    await sharp(req.file.buffer)
    .resize(600,600)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`upload/brands/${filename}`)
    req.body.image = filename;
    next();
})

exports.getBrands = factory.getAll(brandModel)

exports.getBrand =factory.getOne(brandModel)

exports.createBrands = factory.createOne(brandModel)

exports.updateBrands = factory.updateOne(brandModel)


exports.deleteBrand = factory.deleteOne(brandModel)

