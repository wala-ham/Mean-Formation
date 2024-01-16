//3STEPQS
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose;
