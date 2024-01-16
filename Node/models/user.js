//3steps
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = mongoose.model('User',{
    name:{
        type : String
    },
    lastname : {
        type : String
    },
    age : {
        type:Number
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    // Add a reference to products
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})


module.exports = User;


