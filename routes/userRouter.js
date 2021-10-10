// Requiring modules
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect(req.baseUrl + "/dashboard");
});

router.get("/login", (req, res) => {
  res.render("user/login", { title: "Login" });
});

router.get("/dashboard", (req, res) => {
  res.render("user/home", { title: "Dashboard" });
});

router.get("/register-phone", (req, res) => {
  res.render("user/registerPhone", { title: "Register Phone" });
});

router.get("/register-ethereum", (req, res) => {
  res.render("user/registerEthereum", { title: "Register Ethereum" });
});

router.get("/vote", (req, res) => {
  res.render("user/vote", { title: "Vote" });
});

router.get("/results", (req, res) => {
  res.render("user/results", { title: "Results" });
});

module.exports = router;
