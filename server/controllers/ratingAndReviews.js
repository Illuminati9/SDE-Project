const RatingAndReviews = require('../models/ratingAndReviews.js')
const ProviderDetails = require('../models/providerDetails.js')


exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;

        const { rating, review, providerId } = req.body;

        if (!rating || !review || !providerId) {
            return res.status(400).json({
                success: false,
                message: "Required Details Not Found",
            });
        }

        const providerDetails = await ProviderDetails.findOne({
            _id: providerId,
        });

        if (!providerDetails) {
            return res.status(403).json({
                success: false,
                message: "Provider not found",
            });
        }

        const alreadyReviewed = await RatingAndReviews.findOne({
            user: userId,
            providerDetails: providerId,
        });

        if (!alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Provider is Already Reviewed by the User",
            });
        }

        const ratingAndReview = await RatingAndReviews.create({
            rating,
            review,
            providerDetails: providerId,
            user: userId,
        });

        await ProviderDetails.findByIdAndUpdate(
            { _id: providerId },
            {
                $push: {
                    ratingAndReviews: ratingAndReview._id,
                },
            },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Rating and Review Created Successfully",
            ratingAndReview,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create rating and review",
            error: error.message,
        });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const providerId = req.body;

        const averageRating = await RatingAndReviews.aggregate([
            {
                $match: {
                    providerDetails: new mongoose.Types.ObjectId(providerId),
                },
            },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" },
                },
            },
        ]);

        if (averageRating.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: averageRating[0].avgRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no Ratings Given Till Now",
            avgRating: 0,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch average rating",
            error: error.message,
        });
    }
};

exports.getAllRatingAndReviews = async (req, res) => {
    try {
        const allRatingAndReviews = await RatingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email",
            })
            .populate({
                path: "providerDetails",
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All Reviews Fetched Successfully",
            data: allRatingAndReviews,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};