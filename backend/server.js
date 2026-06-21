require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));