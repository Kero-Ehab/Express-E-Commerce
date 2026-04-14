const mongoose = require('mongoose')


//1-creaate schema
const categorySchema = new mongoose.Schema({
    name: String,
    
    
})
// 2- create model 
const CategoryModel = mongoose.model('Category', categorySchema)