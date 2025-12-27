const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");

//require listing schema
const Listing = require("./models/listing.js");

//connecting with mongodb server
const my_Url = "mongodb://127.0.0.1:27017/wonderlust";

//overriding the route method
const methodOverride =  require("method-override");

//ejs mate for styling
const ejsMate = require("ejs-mate");


//setting views engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Reading data from the form or the link
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//using method override
app.use(methodOverride("_method"));

//use ejs-mate engine
app.engine("ejs", ejsMate);

//acess the public folder
app.use(express.static(path.join(__dirname, "/public")));


//mongodb connection
main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(my_Url);
}


app.get("/", (req, res)=>{
    res.send("working successfully");
});

//creating a listing page
app.get("/listing", async (req, res)=>{
    const Listings = await Listing.find({});
    res.render("./listings/index.ejs", {Listings});
    
})

//creating new &create route
app.get("/listing/new",(req, res)=>{
    res.render("listings/new.ejs")
});//here we cave created a new listing

//now to add it to the listings
app.post("/listing", async (req, res) => {
  console.log(req.body); // 👈 CHECK THIS

  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
});


//creating a listing/:id page
app.get("/listing/:id", async(req, res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})


//creating a listing route
// app.get("/listing", async (req, res)=>{
//   let samplelesting = new Listing({
//     title: "My new Villa",
//     description: "A Location Near to the beach",
//     price: 1500,
//     location: "Daman, India",
//     country: "India",

//   });
  
//   await samplelesting.save();
//   console.log("sample was saved");
//   res.render("/listings/index.ejs");
// })

//edit route
app.get("/listing/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})
});

//update route
app.put("/listing/:id", async (req, res)=>{
    let {id}= req.params
   await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listing/${id}`);
});

//delete
app.delete("/listing/:id", async(req, res)=>{
    let {id} = req.params
     let deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     res.redirect("/listing");
    
})
app.listen(port, ()=>{
    console.log(`app is listening on http://localhost:${port}`);

});
