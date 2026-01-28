const listing = require("../models/listing");

module.exports.index=async(req,res)=>{
   const allListing=await listing.find({});
   res.render("index.ejs",{allListing});
}

module.exports.renderNewForm=(req,res)=>{
   
    res.render("new.ejs")

}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
  
    const list=await listing.findById(id).populate({
                                                   path:"reviews",
                                                   populate:{
                                                        path:"author"
                                                    }
                                                   }).populate("owner");
  
   if(!list){
        req.flash("error","Listing you requested for doesnot exist!");
         return res.redirect("/listings");
    }
  
    res.render("show.ejs",{list});
}

module.exports.createListing=async (req,res)=>{
  
  
   const list=req.body.listing;
    const newListing=new listing(list);

     if (req.file) {
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

    newListing.owner = req.user._id; 


    await newListing.save(); 
    req.flash("success","New Listing Successfully Added!");
    res.redirect("/listings");
}

module.exports.renderEditForm=async(req,res)=>{
  
   

    let {id}=req.params;
    const list=await listing.findById(id);
      if(!list){
        req.flash("error","Listing you requested for doesnot exist!");
         return res.redirect("/listings");
    }

    let originalListingUrl=list.image.url;
    originalListingUrl=originalListingUrl.replace("/upload","/upload/w_250")
    res.render("edit.ejs",{list,originalListingUrl});
    
}

module.exports.updateListing=async(req,res)=>{

    let {id}=req.params;
     
    let listingPlace=await listing.findByIdAndUpdate(id, {...req.body.listing},{ runValidators: true });

    if (typeof req.file!== "undefined"){
     let url=req.file.path;
     let filename= req.file.filename;
     listingPlace.image={url,filename};
     await listingPlace.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    const deleted=await listing.findByIdAndDelete(id);
    console.log(deleted);
     req.flash("success","Listing Deleted!");
    res.redirect('/listings');
}