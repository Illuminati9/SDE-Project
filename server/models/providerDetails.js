const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
    },
    shopDescription: {
        type: String,
        required: true,
    },
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RatingAndReviews'
        }
    ],
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    phoneNumber:{
        type: Number,
        required: true,
        maxLength: 10,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProviderAddress'
    },
    pincode: {
        type: Number,
        length: 6,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('ProviderDetails',providerSchema);