require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { DATABASE } = require("./config.js");

const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/link")

const morgan = require("morgan");

const app = express();

// db connection
mongoose.set("strictQuery", false); // required for version 6
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", linkRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
