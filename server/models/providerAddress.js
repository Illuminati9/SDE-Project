const mongoose = require('mongoose');

const providerAddressSchema = new mongoose.Schema({
    shopNumber: {
        type: String,
        trim: true,
        required: true,        
    },
    streetName:{
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        required: true,
    }
})

module.exports = mongoose.model('ProviderAddress',providerAddressSchema);