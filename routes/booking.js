const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Listing = require("../models/listings");
const { isLoggedIn } = require("../middleware");

router.post("/:id", isLoggedIn, async (req, res) => {

const { id } = req.params;

const listing = await Listing.findById(id);

if(!listing){
req.flash("error","Listing not found");
return res.redirect("/listings");
}

const { checkin, checkout } = req.body;

const start = new Date(checkin);
const end = new Date(checkout);

const nights = (end-start)/(1000*60*60*24);

if(nights<=0){
req.flash("error","Checkout must be after check-in");
return res.redirect(`/listings/${id}`);
}

const subtotal = nights * listing.price;
const tax = subtotal * 0.18;
const total = subtotal + tax;

const booking = new Booking({
listing:id,
user:req.user._id,
checkin,
checkout,
nights,
subtotal,
tax,
total
});

await booking.save();

req.flash("success","Booking confirmed!");

res.redirect(`/listings/${id}`);

});

module.exports = router;