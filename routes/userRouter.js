// Requiring modules
const express = require("express");
const router = express.Router();
const passport = require("passport");
const validateForm = require("../utils/validateLogin");

// Importing middlewares
const {
  ensureAuthentication,
  forwardAuthentication,
} = require("../middlewares/authUser");

/* Routes */

// User directory
router.get("/", ensureAuthentication, (req, res) => {
  res.redirect("/user/login");
});

// Login Page
router.get("/login", forwardAuthentication, (req, res) => {
  res.render("user/login", { title: "Login" });
});

// Login Post
router.post("/login", (req, res, next) => {
  const { aadhaar, password } = req.body;
  const errors = validateForm(aadhaar, password);
  if (errors.length > 0) {
    res.render("user/login", { title: "Login", errors, aadhaar, password });
  } else {
    passport.authenticate("local", {
      successRedirect: "/user/dashboard",
      failureRedirect: "/user/login",
      failureFlash: true,
    })(req, res, next);
  }
  // TODO Add OTP Login
});

// Dashboard Page
router.get("/dashboard", ensureAuthentication, (req, res) => {
  res.render("user/home", { title: "Dashboard", user: req.user });
});

// Phone Registration Page
router.get("/register-phone", ensureAuthentication, (req, res) => {
  res.render("user/registerPhone", { title: "Register Phone", user: req.user });
});

// Ethereum Acc Registration Page
router.get("/register-ethereum", ensureAuthentication, (req, res) => {
  res.render("user/registerEthereum", {
    title: "Register Ethereum",
    user: req.user,
  });
});

// Voting Page
router.get("/vote", ensureAuthentication, (req, res) => {
  res.render("user/vote", { title: "Vote", user: req.user });
});

// Results Page
router.get("/results", ensureAuthentication, (req, res) => {
  res.render("user/results", { title: "Results", user: req.user });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have been successfully logged out");
  res.redirect("/user/login");
});

// 404 Page
router.use(function (req, res, next) {
  res.status(404).render("user/404");
});

module.exports = router;
