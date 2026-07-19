const {check, body} = require('express-validator')
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')


exports.getbrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleware
]

exports.createBrandValidator = [
    check("name").notEmpty().withMessage("Brand name is required").custom((val, {req}) =>{
        req.body.slug = slugify(val);
        return true;
    })
    .isLength({min: 3}).withMessage("Brand name must be at least 3 characters long")
    .isLength({max: 32}).withMessage("Brand name must be at most 32 characters long")    
    .matches(/^[A-Za-z\s]+$/).withMessage("Brand name must be alphabetic"),
    
    validatorMiddleware
]

exports.updateBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    body('name').custom((val, {req}) =>{
        req.body.slug = slugify(val);
        return true;
    }),
    validatorMiddleware
]

exports.deleteBrandValidator = [
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleware
]