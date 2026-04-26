const express = require('express')
const {getbrandValidator,
     createBrandValidator,
     updateBrandValidator,
     deleteBrandValidator
} =  require('../utils/validator/brandValidator')
const { getBrands,
        getBrand,
        createBrand,
        updateBrand,
        deleteBrand
     } = require('../services/brandService')
const router = express.Router()

router.route('/').get(getBrands).post(createBrandValidator,createBrand)
router.route('/:id')
.get(getbrandValidator,getBrand)
.put(updateBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand)

module.exports = router