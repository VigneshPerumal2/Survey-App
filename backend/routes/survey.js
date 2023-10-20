// /routes/survey.js

const express = require("express");
const Survey = require("../models/survey");
const router = express.Router();

// POST route to submit survey responses
router.post("/", async (req, res) => {
  try {
    const surveyData = new Survey(req.body);
    await surveyData.save();
    res.status(201).send({ message: "Response saved!" });
  } catch (error) {
    res.status(400).send({ error: "Failed to save response!" });
  }
});

// GET route to fetch all survey responses
router.get("/", async (req, res) => {
  try {
    const responses = await Survey.find();
    res.status(200).send(responses);
  } catch (error) {
    res.status(400).send({ error: "Failed to fetch responses!" });
  }
});

module.exports = router;
