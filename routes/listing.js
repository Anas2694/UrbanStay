const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");

const { isLoggedIn } = require("../middleware");
const listingController = require("../utils/controllers/listings");

const Listing = require("../models/listings");

const multer = require("multer");
const { storage } = require("../cloudConfig");

const upload = multer({ storage });

/* ========================
   VALIDATION
======================== */

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }

    next();
};

/* ========================
   SEARCH ROUTE
======================== */

router.get("/search", async (req,res)=>{

const { location } = req.query;

const listings = await Listing.find({
$or:[
{ location:{ $regex: location, $options:"i" }},
{ country:{ $regex: location, $options:"i" }}
]
});

res.render("listings/index",{ listings });

});

/* ========================
   CATEGORY FILTER
======================== */

router.get("/filter/:category", async (req,res)=>{

const { category } = req.params;

const listings = await Listing.find({ category });

res.render("listings/index",{ listings });

});

/* ========================
   INDEX + CREATE
======================== */

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    );

/* ========================
   NEW LISTING
======================== */

router.get("/new", isLoggedIn, listingController.renderNewForm);

/* ========================
   EDIT FORM
======================== */

router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(listingController.renderEditForm)
);

/* ========================
   SHOW + UPDATE + DELETE
======================== */

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedIn,
        wrapAsync(listingController.destroyListing)
    );

module.exports = router;