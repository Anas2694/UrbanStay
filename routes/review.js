const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");

const { isLoggedIn } = require("../middleware");

const reviewController = require("../utils/controllers/reviews");

/* VALIDATION */

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    }

    next();
};

/* ROUTES */

router.route("/")
    .post(isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.route("/:reviewId")
    .delete(isLoggedIn, wrapAsync(reviewController.destroyReview));

module.exports = router;