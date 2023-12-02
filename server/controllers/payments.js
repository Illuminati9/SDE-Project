const { razorpayInstance } = require('../config/razorpay.js')
const Orders = require('../models/orders.js')
const User = require('../models/user.js')
const ProviderDetails = require('../models/providerDetails.js')

const mailSender = require('../utils/mailSender.js')
const { paymentSuccessfulTemplate } = require('../mailTemplates/paymentSuccessfulTemplate.js')

const mongoose = require('mongoose')

exports.capturePayment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const providerDetails = await ProviderDetails.findById(id);
        if (providerDetails == null) {
            return res.status(401).json({ message: "No such provider found", success: false });
        }
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(401).json({ message: 'No Such user found', success: false });
        }

        if (userId === providerDetails.provider) {
            return res.status(403).json({ message: "You can't buy your own course", success: false })
        }

        let totalAmount = providerDetails.price;
        console.log(typeof (totalAmount))

        const currency = "INR";
        const options = {
            amount: totalAmount,
            currency,
            receipt: Date.now().toString(),
        }

        const paymentResponse = await razorpayInstance.orders.create(options)
        res.json({
            success: true,
            message: paymentResponse
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Payment went wrong',
            success: false
        })
    }
}


exports.verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    try {

        const providerDetails = await ProviderDetails.findById(id).populate('provider');
        if (providerDetails == null) {
            return res.status(401).json({ message: "No such provider found", success: false });
        }
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(401).json({ message: 'No Such user found', success: false });
        }

        if (userId === providerDetails.provider) {
            return res.status(403).json({ message: "You can't buy your own course", success: false })
        }

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !id || !userId) {
            return res.status(401).json({ message: "Missing Required Fields", success: false })
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex');

        let newOrder;

        if (expectedSignature === razorpay_signature) {
            try {
                newOrder = await Orders.create({ consumerId: id, providerId: providerDetails.provider, orderStatus: 'Processing' })
            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "Payment went wrong", success: false })
            }
        } else {
            try {
                newOrder = await Orders.create({ consumerId: id, providerId: providerDetails.provider, orderStatus: 'Failed' })
            } catch (error) {
                console.log(error)
                res.status(404).json({ message: "Payment isn't valid", success: false })
            }
        }

        console.log(newOrder.providerId)

        const updatedUser = await User.findByIdAndUpdate(
            userId, {
            $push: {
                orders: newOrder._id,
            }
        }, { new: true }
        )

        const emailResponse = await mailSender(
            userDetails.email,
            `Successfully booked ${providerDetails.shopName}`,
            paymentSuccessfulTemplate(providerDetails.shopName, `${providerDetails.provider.firstName} ${providerDetails.provider.lastName}`, userDetails.firstName)
        )

        console.log("Email Sent", emailResponse);

        res.status(201).json({
            message: "Order created Successfully",
            userDetails: updatedUser,
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Facing some issues",success: false})
    }
}