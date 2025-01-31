const mongoose = require('mongoose');

// Define the restaurant schema
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    nameWithOutSpace:{
        type:String,
        required:true
    },
    country: {
        type: String,
    },
    currency: {
        type: String,
    },
    logo:{
        type:String,
    },
 cover:{
        type:String,
    },
    about:{
        type:String,
    },
    location:{
        type:String,
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
