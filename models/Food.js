const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    }
});

module.exports = Food = mongoose.model('food', FoodSchema);