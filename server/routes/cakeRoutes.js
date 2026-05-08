const express = require("express");
const router = express.Router();
const Cake = require("../models/Cake");

router.get("/", async (req, res) => {
  const cakes = await Cake.find();
  res.json(cakes);
});

router.post("/", async (req, res) => {
  const newCake = new Cake(req.body);
  await newCake.save();
  res.json(newCake);
});

module.exports = router;