const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = mongoose.model('Product',{
    title:{
        type : String
    },
    description : {
        type : String
    },
    price : {
        type:Number
    },
    image : {
        type : String
    },
    // Add a reference to the user who bought the product
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = Product; 