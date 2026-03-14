const Listing = require("../../models/listings");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapToken = process.env.MAP_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapToken });


// ================= INDEX =================

// INDEX (with filters)
module.exports.index = async (req,res)=>{

const {trending,category} = req.query;

let filter={};

if(trending==="true"){
filter.trending=true;
}

if(category){
filter.category={$in:[category]};
}

const listings = await Listing.find(filter);

res.render("listings/index",{listings});

};


// ================= SHOW =================

module.exports.showListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" }
        });

    if (!listing) {
        req.flash("error", "Listing you are looking for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};


// ================= NEW FORM =================

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};


// ================= CREATE =================

module.exports.createListing = async (req, res) => {

    // convert location → coordinates
    const geoData = await geocoder
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    // cloudinary image
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    // save coordinates
    newListing.geometry = geoData.body.features[0].geometry;

    await newListing.save();

    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
};


// ================= EDIT FORM =================

module.exports.renderEditForm = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit", { listing });
};


// ================= UPDATE =================

module.exports.updateListing = async (req, res) => {

    const { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
    );

    // update image if new file uploaded
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


// ================= DELETE =================

module.exports.destroyListing = async (req, res) => {

    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};