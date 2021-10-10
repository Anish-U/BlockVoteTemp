// Require modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Import Route files
const userRouter = require("./routes/userRouter");

// Fetch Environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/BlockVote";

// Create App Instance
const app = express();

app.use(express.json());
app.disable("x-powered-by");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));

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

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/user", userRouter);

// Listen to PORT
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
