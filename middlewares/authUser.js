// Function to check that user is authenticated
const ensureAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Please log in to view dashboard");
  res.redirect("/user/login");
};

// Function to forward user to dashboard if authenticated
const forwardAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/dashboard");
};

module.exports = { ensureAuthentication, forwardAuthentication };
