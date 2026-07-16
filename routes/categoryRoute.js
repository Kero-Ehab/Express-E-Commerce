const express = require('express')
const multer = require('multer')
const {getCategoryValidator,
     createCategoryValidator,
     updateCategoryValidator,
     deleteCategoryValidator
} =  require('../utils/validator/categoryValidator')
const { getCategories,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        uploadCategoryImage,
        resizeImage
     } = require('../services/categoryService')


const upload = multer({dest: 'upload/categories'})     
const subCategoryRoute = require('./subCategoryRoute')
const router = express.Router()

router.use('/:categoryId/subcategories', subCategoryRoute)
router
.route('/')
.get(getCategories)
.post(
     uploadCategoryImage,
     resizeImage,
     createCategoryValidator,
     createCategory
);
router.route('/:id')
.get(getCategoryValidator,getCategory)
.put(
     uploadCategoryImage,
     resizeImage,
     updateCategoryValidator,
     updateCategory
)
.delete(deleteCategoryValidator,deleteCategory)

module.exports = router
