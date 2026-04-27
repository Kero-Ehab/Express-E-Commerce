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
        deleteBrand
     } = require('../services/brandService')
const router = express.Router()

router.route('/').get(getBrands).post(createBrandValidator,createBrands)
router.route('/:id')
.get(getbrandValidator,getBrand)
.put(updateBrandValidator,updateBrands)
.delete(deleteBrandValidator,deleteBrand)

module.exports = router