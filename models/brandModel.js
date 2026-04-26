const mongoose = require('mongoose')


//1-creaate schema
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand is required'],
        unique: [true, 'Brand name must be unique'],
        minlength: [3, 'Brand name must be at least 3 characters'],
        maxlength: [30, 'Brand name must be at most 30 characters']
    },
    slug:{
        type: String,
        lowercase: true,
    },    
    image: {
        type: String,
    },
},
{timestamps: true}

)
// 2- create model 
const BrandModel = mongoose.model('Brand', brandSchema)

module.exports = BrandModel
