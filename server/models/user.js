const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    userType: {
        type: String,
        required: true,
        default: "Consumer",
        trim:true,
    },
    id: String,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports=User;
