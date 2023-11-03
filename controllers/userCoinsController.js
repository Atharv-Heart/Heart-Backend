const UserCoins = require("../models/userCoinsModel");



const getCoins = async (req, res) => {
  try {
    const { userId } = req.user;
    const userCoins = await UserCoins.findOne({ userId });

    if (!userCoins) {
      return res.status(404).json({coins: 0});
    }

    res.status(200).json({ coins: userCoins.coins });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user's coins." });
  }
};

const addCoins = async (req, res) => {
  try {
    const { userId } = req.user;
    const userCoins = await UserCoins.findOne({ userId });

    if (!userCoins) {
      const newUserCoins = new UserCoins({ userId, coins: 10 });
      await newUserCoins.save();
    } else {
      userCoins.coins += 10;
      await userCoins.save();
    }

    res.status(201).json({success:true});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding coins to the user's account." });
  }
};

module.exports = {
  addCoins,
  getCoins,
};
