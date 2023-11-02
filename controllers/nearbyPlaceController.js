const cloudinary = require("cloudinary").v2;
const NearbyPlace = require("../models/NearbyPlace");

const saveNearbyPlace = async (req, res) => {
  try {
    const { userId } = req.user;
    const { placeName, placeAddress } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required." });
    }

    if (!placeName || !placeAddress) {
      return res.status(400).json({ error: "Place name and place address are required." });
    }


    const placeImage = req.files.image;

    const result = await cloudinary.uploader.upload(placeImage.tempFilePath, {
      folder: "atharvNearbyPlaces",
    });

    const nearbyPlace = new NearbyPlace({
      userId,
      placeName,
      placeAddress,
      placeImage: result.secure_url,
    });

    await nearbyPlace.save();
    res.status(201).json({error:"Nearby place saved successfully."});
  } catch (error) {
    res.status(500).json({error:"Error saving nearby place."});
  }
};

const getNearbyPlaces = async (req, res) => {
  try {
    const { userId } = req.user;

    const nearbyPlaces = await NearbyPlace.find({ userId });
    res.status(200).json(nearbyPlaces);
  } catch (error) {
    res.status(500).json({error:"Error fetching nearby places."});
  }
};

module.exports = {
  saveNearbyPlace,
  getNearbyPlaces,
};
