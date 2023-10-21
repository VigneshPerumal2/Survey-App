// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const surveyRoutes = require("./routes/survey");

const app = express();

// Connect to MongoDB (assuming local MongoDB instance)
mongoose.connect(
  "mongodb+srv://vigneshp2498:2FY6ahngVyZ2lfr2@cluster0.ylk5rcn.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/survey", surveyRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
