const express=require('express')
const router=express.Router({mergeParams:true})
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js")

const wrapAsync = require("../utils/wrapAsync");

const reviewController=require("../controllers/review.js")

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//review delete route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;