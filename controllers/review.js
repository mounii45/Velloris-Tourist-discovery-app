const listing = require("../models/listing");
const Review=require('../models/review.js');

module.exports.createReview=async(req,res)=>{
    
  const list = await listing.findById(req.params.id);
   
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
   
    list.reviews.push(newReview);

    await newReview.save();
    await list.save();
     
     req.flash("success","New Review Created!");
    res.redirect(`/listings/${list._id}`);
}

module.exports.deleteReview=async(req,res)=>{
   let {id,reviewId}=req.params;
 
   let list=await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
     let review= await Review.findByIdAndDelete(reviewId);

     console.log(review.comment);
     req.flash("success","Review Deleted!");
   res.redirect(`/listings/${id}`);
}