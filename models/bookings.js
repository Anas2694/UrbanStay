const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

listing:{
type:Schema.Types.ObjectId,
ref:"Listing",
required:true
},

user:{
type:Schema.Types.ObjectId,
ref:"User",
required:true
},

checkin:{
type:Date,
required:true
},

checkout:{
type:Date,
required:true
},

nights:Number,

subtotal:Number,
tax:Number,
total:Number,

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Booking",bookingSchema);