const mongoose = require('mongoose')


//1-creaate schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category is required'],
        unique: [true, 'Category name must be unique'],
        minlength: [3, 'Category name must be at least 3 characters'],
        maxlength: [30, 'Category name must be at most 30 characters']
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
const CategoryModel = mongoose.model('Category', categorySchema)

module.exports = CategoryModel
