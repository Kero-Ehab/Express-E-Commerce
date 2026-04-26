const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')


exports.getsubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid subcategory id'),
    validatorMiddleware
]

exports.createSubCategoryValidator = [
    check("name").notEmpty().withMessage("SubCategory name is required")
    .isLength({min: 2}).withMessage("SubCategory name must be at least 2 characters long")
    .isLength({max: 32}).withMessage("SubCategory name must be at most 32 characters long"),
    check('category')
    .notEmpty()
    .withMessage('SubCategory required')
    .isMongoId()
    .withMessage('invalid category id'),
    validatorMiddleware
]


exports.updatesubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid subcategory id'),
    validatorMiddleware
]

exports.deletesubCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category id'),
    validatorMiddleware
]