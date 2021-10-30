const express = require("express");
const router = express.Router();
const Reading = require("../model/reading");
router.use(express.json());

router.get("/api/readings", async (req, res) => {
  try {
    const readings = await Reading.find();
    res.json(readings);
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/readings/latest10", async (req, res) => {
  const readings = await Reading.find().sort("-created_at").limit(10);
  res.json(readings);
});

router.get("/api/readings/:field1/:field2", async (req, res) => {
  try {
    const reading = await new Reading(req.params);
    const newreading = await reading.save();
    res.json(newreading);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
