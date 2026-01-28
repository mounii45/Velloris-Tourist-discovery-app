const express=require('express')
const router=express.Router()

const {isLoggedIn,validateListing}=require("../middleware.js")//access to create,update&delete

const wrapAsync = require("../utils/wrapAsync");

const listingController=require("../controllers/listing.js")

const multer  = require('multer')

const {storage}=require('../cloudConfig.js')
const upload = multer({ storage })

router.route('/')

    //Index Route
   .get(wrapAsync(listingController.index))

   //return back from creating new route
   //validateListing is middleware is called when that route is mentioned
   //should be logged in post as they can be done through hopscotch
   .post(isLoggedIn,upload.single('listing[image][url]'),validateListing, wrapAsync(listingController.createListing));
   
  // .post(,(req,res)=>{   res.send(req.file); })


//New & Create Route
router.get('/new',isLoggedIn,listingController.renderNewForm)

//after new route->show route order as new can be interpreted as :id
router.route('/:id')

     //Show Route
    .get(wrapAsync(listingController.showListing))

    //update & return back
    .put(isLoggedIn,
        upload.single('listing[image][url]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    
    //Delete Route
    .delete(isLoggedIn,
            wrapAsync(listingController.deleteListing))

//Edit Route
router.get('/:id/edit',isLoggedIn,wrapAsync(listingController.renderEditForm))


module.exports=router;