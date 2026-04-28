const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const CategoryModel = require('../../models/categoryModel');
const SubCategoryModel = require('../../models/subCategoryModel');
const subCategoryModel = require('../../models/subCategoryModel');


exports.createProductValidator = [
    check('title').isLength({min:3}).notEmpty().withMessage('must be at least 3 chars').withMessage('Title is required'),
    check('description').notEmpty().isLength({max: 2000}).withMessage('must be at most 2000 chars').withMessage('Description is required'),
    check('price').notEmpty().withMessage('price is required').isNumeric().withMessage('price must be a number').isLength({max:32}).withMessage('Too Long price'),
    check('quantity').notEmpty().withMessage('quntity is required').isNumeric().withMessage('product quantity must be a number'),
    check('sold').optional().isNumeric().withMessage('sold must be a number'),
    check('priceAfterDiscount').optional().toFloat().isNumeric().withMessage('Product price after discount must be a number')
    .custom((value, {req}) =>{
        if(req.body.price <= value){
            throw new Error("price After Discount must be less than price");
        }
        return true;
    }),
    check('colors').optional().isArray().withMessage('colors must be an array'),
    check('imageColor').optional().isArray().withMessage('imageColor must be an array'),
    check('category').notEmpty().withMessage('Product must be belong to a category').isMongoId().withMessage('Invalid id format')
    .custom(async(categoryId) =>{
        const category = await CategoryModel.findById(categoryId)
        if(!category){
            //throw new Error("Category not found")
            return Promise.reject(new Error(`There is n.o category for this id ${categoryId}`));
        }
        return true;
    }),
    check('subCategories').optional().isArray().withMessage('Invalid id format')
    .custom((subCategoriesIds)=>{
        return subCategoryModel.find({_id:{$in:subCategoriesIds}}).then(
            (result)=>{
                if(result.length <1 || result.length !== subCategoriesIds.length ){
                    //throw new Error("Invalid sub categories")
                    return Promise.reject(new Error(`There is n.o sub category for this id ${subCategoriesIds}`));
                }
                return true;
                // console.log(result.length)
                // console.log(subCategoriesIds.length)
            }
        )
    }),
    check('brand').optional().isMongoId().withMessage('Invalid id format'),
    check('rateingsAverage')
    .optional()
    .isNumeric()
    .withMessage('rateingsAverage must be a number')
    .isLength({min:1}).withMessage('rattingAverage must be at least 1 star')
    .isLength({max:5}).withMessage('rattingAverage must be less than 5 star'),
    check('ratingsQuantity').optional().isNumeric().withMessage('ratingsQuantity must be a number'),

    validatorMiddleware,
]

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware,
]

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware,
]

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid id format'),
    validatorMiddleware,
]


