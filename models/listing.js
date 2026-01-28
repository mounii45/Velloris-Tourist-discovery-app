const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Review=require("./review.js")

const listSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
          filename: {
      type: String,
   
    },
    url: {
      type: String,
    },
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{ //array -> one to many
        type:Schema.Types.ObjectId,
        ref:"Review",

    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

//as we delete the listing -> all reviews will be deleted
listSchema.post("findOneAndDelete",async(listing)=>{
    if (listing){
   await Review.deleteMany({reviews:{$in:listing.reviews}});
    }
})

const list=mongoose.model("listings",listSchema);


module.exports=list;