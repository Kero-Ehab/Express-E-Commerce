const {check, body} = require('express-validator')
const validatorMiddleware = require('../../middlewares/validatorMiddleware')
const slugify = require('slugify')


exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category id'),
    validatorMiddleware
]

exports.createCategoryValidator = [
    check("name").notEmpty().withMessage("Category name is required").custom((val , {req})=>{
        req.body.slug = slugify(val);
        return true;
    })
    .isLength({min: 3}).withMessage("Category name must be at least 3 characters long")
    .isLength({max: 32}).withMessage("Category name must be at most 32 characters long")
    .matches(/^[A-Za-z\s]+$/).withMessage("Category name must be alphabetic"),
    validatorMiddleware
]

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category id'),
    body('name').custom((val, {req})=>{
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('invalid category id'),
    validatorMiddleware
]