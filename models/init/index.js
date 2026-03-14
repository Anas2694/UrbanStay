const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../listings.js");
const User = require("../user.js");

const mongoURL = "mongodb+srv://Anas_2004:Anas_2694@cluster0.ogkcjiq.mongodb.net/UrbanStay";

async function main() {
  await mongoose.connect(mongoURL);
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {

  // delete old listings
  await Listing.deleteMany({});

  // get any existing user
  const user = await User.findOne();

  // attach owner to every listing
  const listings = initdata.data.map((obj) => ({
    ...obj,
    owner: user._id
  }));

  // insert listings
  await Listing.insertMany(listings);

  console.log("Database initialized with sample data");
};

initDB();


