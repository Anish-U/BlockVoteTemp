// Requiring modules
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;

// Importing DB Models(Schema)
const User = require("../models/user");

// Function to set Passport Strategy
const setStrategy = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "aadhaar" },
      (aadhaar, password, done) => {
        // Finding user with aadhaar
        User.findOne({
          aadhaar: aadhaar,
        })
          .then((user) => {
            // User not found
            if (!user) {
              console.log(`${aadhaar} is not registered`);
              return done(null, false, {
                message: "Enter valid aadhaar and password",
              });
            }

            // If User found comparing passwords
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
              }
              // If passwords match
              if (isMatch) {
                return done(null, user);
              }
              // If passwords does not match
              else {
                console.log("Password is incorrect");
                return done(null, false, {
                  message: "Enter valid aadhaar and password",
                });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );

  // Serializing User
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserializing User
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

module.exports = { setStrategy };
