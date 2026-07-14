const brandModel = require('../models/brandModel')
const factory = require('./handlersFactory')


exports.getBrands = factory.getAll(brandModel)

exports.getBrand =factory.getOne(brandModel)

exports.createBrands = factory.createOne(brandModel)

exports.updateBrands = factory.updateOne(brandModel)


exports.deleteBrand = factory.deleteOne(brandModel)

