const {createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory, setCategoryIdToBody, createFilterObject} = require('../services/subCategoryService')
const express = require('express')
const {createSubCategoryValidator, getsubCategoryValidator, updatesubCategoryValidator, deletesubCategoryValidator} = require('../utils/validator/subCategoryValidator')

//Merge params allow us to access the parent route parameters (categoryId)
const router = express.Router({mergeParams: true});

router.route('/').post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory);
router.route('/').get(createFilterObject,getSubCategories);
router.route('/:id').get(getsubCategoryValidator, getSubCategory).put(updatesubCategoryValidator, updateSubCategory).delete(deletesubCategoryValidator, deleteSubCategory);
module.exports = router;