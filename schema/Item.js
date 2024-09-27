const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    publicIdImg:{
        type: String,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;