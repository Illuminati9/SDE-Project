const mongoose = require('mongoose');
const ProviderDetails = require('../models/providerDetails.js')
const ProviderAddress = require('../models/providerAddress.js')
const Category = require('../models/category.js');
const User = require('../models/user.js');

exports.createProviderDetails = async (req, res) => {
    try {
        const { shopName,
            shopDescription,
            price,
            phoneNumber,
            category,
            shopNumber,
            streetName,
            city,
            state,
            pincode } = req.body;

        if (!shopName ||
            !shopDescription ||
            !price ||
            !phoneNumber ||
            !category ||
            !shopNumber ||
            !streetName ||
            !city ||
            !state ||
            !pincode) {
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required, Please Fill All The Details",
                shopName,
                shopDescription,
                price,
                phoneNumber,
                category,
                shopNumber,
                streetName,
                city,
                state,
                pincode
            })
        }


        const providerId = req.user.id;

        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        const newProviderAddress = await ProviderAddress.create({
            shopNumber,
            streetName,
            city,
            state
        });

        const newProviderDetails = await ProviderDetails.create({
            shopName,
            shopDescription,
            price,
            provider: providerId,
            phoneNumber,
            category: categoryDetails._id,
            address: newProviderAddress._id,
            pincode
        })

        await User.findByIdAndUpdate({ _id: providerId, }, {
            $push: {
                shops: newProviderDetails._id,
            }
        }, { new: true });

        await Category.findByIdAndUpdate({ _id: categoryDetails._id }, {
            $push: {
                providers: newProviderDetails._id,
            }
        }, {
            new: true
        });

        console.log('Created successfully')
        return res.status(201).json({
            success: true,
            message: "Provider Details created Successfully",
            data: newProviderDetails,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create provider details",
            error: error.message
        })
    }
}

exports.getProviderDetails = async (req, res) => {
    try {
        const { id } = req.params || req.user._id;

        const providerDetails = await ProviderDetails.find({ provider: id }).populate('address').populate('ratingAndReviews');

        if (!providerDetails) {
            return res.status(400).json({
                success: false,
                message: "No details found with that id provided",

            })
        }

        return res.status(200).json({
            success: false,
            message: "Provided details fetched successfully",
            providerDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch provider details",
            error: error.message
        })
    }
}

exports.getAllProviders = async (req, res) => {
    try {
        const providers = await ProviderDetails.find({}).populate('address').populate('ratingAndReviews');

        if (!providers) {
            return res.status(400).json({
                success: false,
                message: 'No providers available'
            });
        }

        return res.status(200).json({
            success: true,
            count: providers.length,
            providers
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch provider details",
            error: error.message
        })
    }
}