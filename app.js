if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();

app.locals.mapToken = process.env.MAP_TOKEN;


const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const bookingRoutes = require("./routes/booking");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const dbUrl = process.env.ATLASDB_URL;

mongoose.connect(dbUrl)
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((err) => {
    console.log(err);
});


const store = MongoStore.create({

    mongoUrl: dbUrl,    
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR", e);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,

        maxAge: 1000 * 60 * 60 * 24 * 7,

        httpOnly: true,

    },

};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const userRoutes = require("./routes/user.js");

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/bookings", bookingRoutes);

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "student"
    });
    const registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});

/* DEBUG ROUTE */
app.get("/testlogin", (req, res) => {
    console.log("USER:", req.user);
    console.log("SESSION:", req.session);
    res.send(req.user || "No user logged in");
});

/* PAGE NOT FOUND */
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs", { err, message, statusCode });
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});