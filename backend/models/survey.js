// /models/survey.js

const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  workoutRoutine: { type: String, required: true },
  followsDiet: { type: String, required: true }, // Yes or No
  fitnessLevel: { type: Number, required: true }, // 1 to 5
  fitnessActivities: [{ type: String }], // Array of activities
  primaryGoal: { type: String, required: true },
});

module.exports = mongoose.model("Survey", surveySchema);
