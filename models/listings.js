const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const { array } = require("joi");

const listingSchema = new Schema({

title:{
type:String,
required:true
},

description:String,

image:{
url:{
type:String,
default:"https://images.unsplash.com/photo-1506744038136-46273834b3fb"
},
filename:{
type:String,
default:"listingimage"
}
},

price:Number,

location:String,

country:String,

category: {
    type: [String],
    enum: ["trending","farms","cabins","views","beach","pools"],
},

trending:{
type:Boolean,
default:false
},

geometry:{
type:{
type:String,
enum:["Point"],
default:"Point"
},
coordinates:[Number]
},

owner:{
type:Schema.Types.ObjectId,
ref:"User"
},

reviews:[
{
type:Schema.Types.ObjectId,
ref:"Review"
}
]

});


listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){
await Review.deleteMany({_id:{$in:listing.reviews}});
}
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;