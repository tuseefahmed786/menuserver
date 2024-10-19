const mongoose = require('mongoose');

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
    },
    currency: {
        type: String,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Reference to User (restaurant owner)
    },
    
});

// Create the Restaurant model using the schema
const restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = restaurant;
