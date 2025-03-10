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
    },
    publicIdImg:{
        type: String,
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;