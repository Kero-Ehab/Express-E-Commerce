const mongoose = require('mongoose');


const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'SubCategory name must be unique'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [32, 'Name must be at most 32 characters long']
    },
    slug: {
        type: String,
        lowercase: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'SubCategory must be belong to parent category']
    }
}, { timestamps: true })

module.exports = mongoose.model('SubCategory', subCategorySchema);