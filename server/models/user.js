const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/,
        },
        password: {
            type: String,
            required: true,
        },
        accountType: {
            type: String,
            enum: ["Admin", "Consumer", "Provider"],
            default: "Consumer",
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        shops: [
            {
                type: mongoose.Types.ObjectId,
                ref: "ProviderDetails"
            }
        ],
        orders: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Orders'
            }
        ],
        token: {
            type: String,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);
