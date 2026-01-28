/*const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
//  & also methods => setPassword(password, [cb]) ,changePassword(oldPassword, newPassword, [cb]) ,authenticate(password, [cb]) & static,error methods,resetAttempts([cb])
const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Load the module
const plm = require("passport-local-mongoose");

// 🔥 FIX: handle Node 23 export shape
const passportLocalMongoose =
  typeof plm === "function" ? plm : plm.default;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
   
  },
});

// Use the resolved function
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
