const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

const menu = mongoose.model('Menu', menuSchema);

module.exports = menu;
