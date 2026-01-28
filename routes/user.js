const express=require('express');
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport=require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const router=express.Router()

const userController=require("../controllers/user.js")

router.route('/signup')
  .get(userController.signupForm)

  .post(wrapAsync(userController.signUpUser))

router.route('/login')
    .get(userController.loginForm)

    //passport acts as middleware to verify (strategy,{failurecase:redirect})
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),
    userController.loginUser)

router.get('/logout',userController.logoutUser)

module.exports=router;