const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../utils/controllers/users");
const { saveRedirectUrl } = require("../middleware");

// SIGNUP PAGE
router.get("/signup", userController.renderSignup);

// SIGNUP LOGIC
router.post("/signup", userController.signup);

// LOGIN PAGE
router.get("/login", userController.renderLogin);

// LOGIN LOGIC
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    (req, res) => {
        console.log("✅ Login success, user:", req.user);
        console.log("Session:", req.session);
        req.flash("success", "Welcome back!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
);
// LOGOUT
router.get("/logout", userController.logout);

module.exports = router;