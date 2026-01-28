if (process.env.NODE_ENV !="production"){
      require('dotenv').config();
}

const express=require('express')
const app=express()

const path=require('path')

var methodOverride = require('method-override')//for edit & delete routes(put/patch/delete)

const mongoose=require('mongoose')
const ejsMate=require('ejs-mate')

const User=require('./models/user.js')

const wrapAsync=require('./utils/wrapAsync.js')//catches async errors displays in other page
const ExpressError=require('./utils/ExpressError.js')//custom class

const cookieParser = require('cookie-parser')//access cookies

const session=require('express-session')//saves b/w multiple tabs
const MongoStore = require('connect-mongo').default;


const flash=require('connect-flash')//notification clears after displaying to user(err/res)

const passport=require('passport')
const LocalStrategy=require('passport-local')



// MIDDLEWARES
app.engine('ejs',ejsMate)//for includes & parts of ejs


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,"/public")))

app.use(methodOverride('_method'));

app.use(cookieParser("secret"));

const dbUrl=process.env.MONGO_URL
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600
})

store.on("error",(err)=>{
    console.log("error in mongo store ",err);
})

const sessionOptions={
                    store,
                    secret:process.env.SECRET,
                    resave:false,
                    saveUninitialized:true,
                    cookie:{
                        expires:Date.now()+7*24*60*60*1000,//for a week info will be saved
                        httpOnly:true,
                        maxAge:7*24*60*60*1000
                    }}
app.use(session(sessionOptions));


app.use(flash());

app.use(passport.initialize())//after session middle ware
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());//store user info in session
passport.deserializeUser(User.deserializeUser());//remove the user related info after session


app.use((req,res,next)=>{
    //res.locals =>stores data you want to send to views (EJS)
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
     res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
     res.locals.mapToken = process.env.MAP_TOKEN;

   // console.log(res.locals.success);->empty array
    next();
})

//ROUTERS (after middlewares)
const listingRoute=require("./routes/listings.js");
const reviewRoute=require("./routes/review.js");
const userRoute=require("./routes/user.js");
app.use("/listings",listingRoute);
app.use("/",userRoute);
app.use("/listings/:id/reviews",reviewRoute);


async function main() {
    mongoose.connect(process.env.MONGO_URL);
 
}
main().then(async()=>{
    console.log("successful connection to db");
      
})
.catch((err)=>{
   console.log(err);
})

app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong!"}=err;
     
  //  res.status(status).send(message);
  res.status(status).render("error.ejs",{status,message});
})



app.listen(8080,()=>{
    console.log("http://localhost:8080");
})
