// Require modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const { setStrategy } = require("./utils/passportConfig");

// Import Route files
const userRouter = require("./routes/userRouter");

// Fetch Environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/BlockVote";
const SESSION_SECRET = process.env.SESSION_SECRET || "Secret";

// Create App Instance
const app = express();

/* Setting middlewares to app instance */
// Middleware for recognizing incoming request object
app.use(express.json());

// Middleware to disable X-powered-by for security reasons
app.disable("x-powered-by");

// Middleware of setting EJS as view engine
app.set("view engine", "ejs");

// Middleware to set static path
app.use(express.static(path.join(__dirname, "/public")));

// Express body parser middleware
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Passport Configuration
setStrategy(passport);

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Connect to MongoDB
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// MongoDB Error Handling
db.on("error", (error) => console.error(`MongoDB Error occurred : ${error}`));
db.once("open", () => {
  console.log("MongoDB connection successful");
});

/* Routes */
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// user Route
app.use("/user", userRouter);

// 404 Page
app.use(function (req, res, next) {
  res.status(404).render("404");
});

// Listen to PORT
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
