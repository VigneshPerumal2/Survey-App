// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const surveyRoutes = require("./routes/survey");

const app = express();

// Connect to MongoDB (assuming local MongoDB instance)
mongoose.connect("mongodb://localhost:27017/fitnessSurvey", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/survey", surveyRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
