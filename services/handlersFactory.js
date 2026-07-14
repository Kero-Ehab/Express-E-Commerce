const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')




exports.getAll = (Model, modelName =  '') =>    
    asyncHandler(async (req, res) => {   
        let filter = {};
        if (req.filterObj){
            filter = req.filterObj;
        }   
    //building query
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
    .filter()
    .search(modelName)
    .limitFields()
    .sort()
    .pagination(documentsCount)
  
    const {mongooseQuery, paginateResult} = apiFeatures
    const documents = await mongooseQuery;

    res.status(200).json({
        result: documents.length,
        paginateResult,
        data: documents
    });
});

    
exports.getOne = (Model) => asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const brand = await Model.findById(id)
    if (!brand) {
        //res.status(404).json({msg: 'No brandy for this brand'})
        return next(new ApiError(`No brand for this ${id}`, 404))
    }
    res.status(200).json({ data: brand })
})

exports.deleteOne = (Model)=>
    asyncHandler(async(req, res, next) =>{
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id)
    if(!document){
        return next(new ApiError(`No document for this ${id}`, 404))
    }
    res.status(200).json({msg: 'document deleted successfully'})
})

exports.updateOne = (Model) =>
    asyncHandler(async(req, res, next) =>{
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!document){
        return next(new ApiError(`No document for this ${req.params.id}`, 404))
    }
    res.status(200).json({data: document})
})

exports.createOne = (Model) => asyncHandler(async(req, res) =>{
    const document = await Model.create(req.body)
    res.status(201).json({data: document})
})