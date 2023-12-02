const mongoose = require('mongoose')

const orderDetails = new mongoose.Schema({
    consumerId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    providerId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date:{
        type:Date,
        default: Date.now()
    },
    orderStatus:{
        type: String,
        enum:['Pending','Successful','Processing','Failed']
    }
})

module.exports = mongoose.model('Orders',orderDetails)