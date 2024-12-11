const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    subscriptionStatus: {
        type: String,
        enum: ['inactive', 'active', 'expired'],
        default: 'inactive'
    },
    subscriptionType: {
        type: String,
        enum: ['monthly', 'yearly', 'free_trial'],
        default: 'free_trial'
    },
    subscriptionStartDate: {
        type: Date
    },
    subscriptionEndDate: {
        type: Date
    },
    trialExpiresAt: {
         type: Date,
          required: true 
 }, // Add this field

})

const user = mongoose.model('user', userSchema)
module.exports = user