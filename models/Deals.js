const mongoose = require("mongoose");

const dealsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  advertisement: {
    type: Boolean,
    required: true,
  },
});

const Deals = mongoose.model("Deals", dealsSchema);

module.exports = Deals;
