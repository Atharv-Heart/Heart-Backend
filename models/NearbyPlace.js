const mongoose = require("mongoose");

const nearbyPlaceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
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

const NearbyPlace = mongoose.model("NearbyPlace", nearbyPlaceSchema);

module.exports = NearbyPlace;
