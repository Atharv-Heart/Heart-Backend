const mongoose = require("mongoose");

const visitedPlaceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  placeAddress: {
    type: String,
    required: true,
  },
  placeImage: {
    type: String,
    required: true,
  },
});

const VisitedPlace = mongoose.model("VisitedPlace", visitedPlaceSchema);

module.exports = VisitedPlace;
