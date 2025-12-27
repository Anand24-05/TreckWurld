const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/279574/pexels-photo-279574.jpeg?cs=srgb",
        set: (v)=> 
            v===""
                ? "https://images.pexels.com/photos/279574/pexels-photo-279574.jpeg?cs=srgb"
                :v,
    },
    price: Number,
    location: String,
    Country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
