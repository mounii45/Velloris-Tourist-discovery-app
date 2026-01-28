const mongoose=require('mongoose')

const initData=require("./data.js")
const listing=require("../models/listing.js");




async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/velloris");
}
main().then(()=>{
    console.log("successful connection to db");
})
.catch((err)=>{
    console.log(err);
})

const initDB =async()=>{
   await listing.deleteMany({});
   //initData.data.map((obj)=>({...obj,owner:}))
   await listing.insertMany(initData.data);
   console.log("data was initialized")
}

initDB();