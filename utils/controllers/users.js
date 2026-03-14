const User = require("../../models/user");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup");
};

module.exports.signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    const newUser = new User({ email, username });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
        if (err) return next(err);

        req.flash("success", "Welcome to UrbanStay!");
        res.redirect("/listings");
    });
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login");
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "Logged out!");
        res.redirect("/listings");
    });
};