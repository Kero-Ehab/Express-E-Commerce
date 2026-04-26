const {check} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')


exports.getbrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleware
]

exports.createBrandValidator = [
    check("name").notEmpty().withMessage("Brand name is required")
    .isLength({min: 3}).withMessage("Brand name must be at least 3 characters long")
    .isLength({max: 32}).withMessage("Brand name must be at most 32 characters long")
    .isAlpha().withMessage("Brand name must be alphabetic")
    ,
    validatorMiddleware
]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleware
]

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleware
]