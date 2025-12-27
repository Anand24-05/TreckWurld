const mongoose = require("mongoose");
const intiData = require("./data.js");
const Listing = require("../models/listing.js");

//connecting with mongodb server
const my_Url = "mongodb://127.0.0.1:27017/wonderlust";

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("err");
});

async function main(){
    await mongoose.connect(my_Url);
} 

const intiDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(intiData.data);
    console.log("data was initialized");
}

intiDb();
