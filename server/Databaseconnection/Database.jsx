const mongoose = require("mongoose");
require('dotenv').config();
const mongoUrl = process.env.DATABASE_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));