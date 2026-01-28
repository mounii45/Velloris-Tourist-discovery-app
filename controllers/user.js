const User = require('../models/user.js');

module.exports.signUpUser=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    let newUser=new User({email,username});
    const regUser=await User.register(newUser,password);
    console.log(regUser);
    req.login(regUser,(err)=>{
    if (err){
        return next(err);
    }

    req.flash("success","Welcome to Velloris!");
    res.redirect("/listings");
  });//login after signup
   
    }catch(err){
         
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser=async(req,res)=>{
    let {username,password}=req.body;
     req.flash("success","Welcome back to Velloris!");
     let redirectUrl=res.locals.redirectUrl || '/listings';
     res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res)=>{
  req.logout((err)=>{
    if (err){
        return next(err);
    }

    req.flash("success","You have logged out!");
    res.redirect("/listings");
  })
}