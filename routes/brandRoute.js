const express = require('express')
const {getbrandValidator,
     createBrandValidator,
     updateBrandValidator,
     deleteBrandValidator
} =  require('../utils/validator/brandValidator')
const { getBrands,
        getBrand,
        createBrands,
        updateBrands,
        deleteBrand,
        uploadBrandImage,
        resizeImage
     } = require('../services/brandService')
const router = express.Router()

router.route('/').get(getBrands).post(uploadBrandImage,resizeImage,createBrandValidator,createBrands)
router.route('/:id')
.get(getbrandValidator,getBrand)
.put(uploadBrandImage,resizeImage,updateBrandValidator,updateBrands)
.delete(deleteBrandValidator,deleteBrand)

module.exports = router