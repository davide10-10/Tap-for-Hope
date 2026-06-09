const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

// Init user
app.post("/api/init", async (req, res) => {
  const { telegramId, username } = req.body;

  let user = await User.findOne({ telegramId });
  if (!user) {
    user = await User.create({
      telegramId,
      username,
      clicks: 0,
      energy: 10
    });
  }

  res.json(user);
});

// Click
app.post("/api/click", async (req, res) => {
  const { telegramId } = req.body;
  const user = await User.findOne({ telegramId });

  if (user.energy <= 0) {
    return res.json({ error: "NO_ENERGY" });
  }

  user.clicks += 1;
  user.energy -= 1;
  await user.save();

  res.json({ clicks: user.clicks, energy: user.energy });
});

// Reward: energy
app.post("/api/reward-energy", async (req, res) => {
  const { telegramId } = req.body;
  const user = await User.findOne({ telegramId });

  user.energy += 20;
  await user.save();

  res.json({ energy: user.energy });
});

// Reward: 400 clicks
app.post("/api/reward-clicks", async (req, res) => {
  const { telegramId } = req.body;
  const user = await User.findOne({ telegramId });

  user.clicks += 400;
  await user.save();

  res.json({ clicks: user.clicks });
});

app.listen(3000, () => console.log("Server running"));
