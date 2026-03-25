const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings");
const Listing = require("../models/listings");
const { isLoggedIn } = require("../middleware");
const eventBus = require('../utils/eventBus');

router.get("/my-bookings", isLoggedIn, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });
  res.render("bookings/my-bookings", { bookings });
});

router.patch("/:id/cancel", isLoggedIn, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking || !booking.user.equals(req.user._id)) {
    req.flash("error", "Not authorized");
    return res.redirect("/bookings/my-bookings");
  }
  booking.status = "cancelled";
  await booking.save();
  req.flash("success", "Booking cancelled");
  res.redirect("/bookings/my-bookings");
});

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
    listing: id,
    user: req.user._id,
    checkin,
    checkout,
    nights,
    subtotal,
    tax,
    total
  });

  await booking.save();
  console.log('Booking saved, emitting event...');
  console.log('User email:', req.user.email);
  console.log('Listing title:', listing.title);

  eventBus.emit('booking.created', { booking, user: req.user, listing });
  console.log('Event emitted!');

  req.flash("success","Booking confirmed!");
  res.redirect(`/listings/${id}`);

});

module.exports = router;