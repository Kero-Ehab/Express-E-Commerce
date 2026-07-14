const SubCategoryModel = require('../models/subCategoryModel');
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


exports.getSubCategories = factory.getAll(SubCategoryModel)

exports.getSubCategory = factory.getOne(SubCategoryModel)

exports. createSubCategory = factory.createOne(SubCategoryModel);

exports.updateSubCategory = factory.updateOne(SubCategoryModel);

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);