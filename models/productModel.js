const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
        trim:true,
        minlength:[3, 'Too short product title'],
        maxlength:[100, 'Too long product title'],
    },
    slug:{
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Product description must be at least 10 characters long'],
    },
    quantity: {
        type:Number,
        required:[true, 'Product description is required'],
        minLength:[20, 'Too short product description']
    },
    sold:{
        type: Number,
        default: 0,

    },
    price:{
        type: Number,
        required:[true, 'Product price is required'],
        trim:true,
        max:[20, 'Too long Product price'],

        
    },
    priceAfterDiscount:{
        type: Number,
    },
    colors:{
        type: [String],
        enum: ['Red', 'Green', 'Blue', 'Black', 'White', 'Gray', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown', 'Gray', 'Silver', 'Gold', 'Bronze', 'Copper', 'Teal', 'Cyan', 'Magenta', 'Lime', 'Maroon', 'Navy', 'Olive', 'Purple', 'Silver', 'Teal'],
    },
    imageColor:{
        type: [String],
        required:[true,'Product image color is required'],
    },
    images:{
        type:[String],
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true, 'Product must belong to a category']
    },
    subCategory:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        //required:[true, 'Product must belong to a sub category'],
    }],
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        //required: [true, 'Product must be belong to category']
    },
    ratingsAverage:{
        type: Number,
        min:[1, "Rated value must be above 1 star"],
        max:[5, "Rated value must be below 5 stars"]
    },
    ratingsQuantity:{
        type:Number,
        default:0,
    }


},{timestamps: true})

module.exports = mongoose.model('Product', productSchema);



// const productSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: [true, 'Title is required'],
//         trim: true,
//         minlength: [2, 'Title must be at least 2 characters long'],
//         maxlength: [100, 'Title must be at most 100 characters long']
//     },
//     slug: {
//         type: String,
//         lowercase: true
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is required'],
//         trim: true,
//         minlength: [10, 'Description must be at least 10 characters long'],
//         maxlength: [1000, 'Description must be at most 1000 characters long']
//     },
//     price: {
//         type: Number,
//         required: [true, 'Price is required'],
//         trim: true,
//         min: [0, 'Price must be at least 0'],
//         max: [100000, 'Price must be at most 100000']
//     },
//     quantity: {
//         type: Number,
//         required: [true, 'Quantity is required'],
//         trim: true,
//         min: [0, 'Quantity must be at least 0'],
//         max: [1000, 'Quantity must be at most 1000']
//     },
//     image: {
//         type: String,
//         required: [true, 'Image is required'],
//         trim: true,
//         minlength: [2, 'Image must be at least 2 characters long'],
//         maxlength: [1000, 'Image must be at most 1000 characters long']
//     },
//     category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required: [true, 'Category is required']
//     },
//     subCategory: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'SubCategory',
//         required: [true, 'SubCategory is required']
//     },
//     brand: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Brand',
//         required: [true, 'Brand is required']
//     }
// }, { timestamps: true })

// module.exports = mongoose.model('Product', productSchema);