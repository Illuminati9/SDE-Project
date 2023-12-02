const express = require('express')
const router = express.Router();

const {isConsumer,isAdmin,isProvider,auth}= require('../middleware/auth.js')
const {createProviderDetails,getProviderDetails,getAllProviders} = require('../controllers/providerDetails.js');
const {createCategory,getCategory,showAllCategories} = require('../controllers/category.js');
const {createRating,getAllRatingAndReviews,getAverageRating} = require('../controllers/ratingAndReviews.js')

router.post('/createCategory',auth,isAdmin,createCategory)
router.get('/showAllCategories',showAllCategories);
router.get('/getCategory/:id',getCategory)

router.post('/createProvider',auth,isProvider,createProviderDetails);
router.post('/getProviderDetails/:id',auth,isProvider,getProviderDetails);
router.get('/getAllProviders',getAllProviders)

router.post('/createReview',auth,createRating);
router.get('/getAverageRating',getAverageRating)
router.get('/getAllRatingAndReviews',getAllRatingAndReviews)

module.exports = router;