const mongoose = require("mongoose");

const userCoinsSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  coins: {
    type: Number,
    default: 0, 
  },
});

const UserCoins = mongoose.model("UserCoins", userCoinsSchema);

module.exports = UserCoins;
