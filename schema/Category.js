const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
      },
      icon: {
        type: String,
        required: false
      },
      products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'  // Reference to the Product model
    }],
      createdAt: {
        type: Date,
        default: Date.now
      },
      ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
