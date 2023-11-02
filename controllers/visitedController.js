const cloudinary = require("cloudinary").v2;
const VisitedPlace = require("../models/VisitedPlace");

const saveVisitedPlace = async (req, res) => {
  const { userId } = req.user;
  const { date, placeName, placeAddress } = req.body;

  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "Image file is required." });
  }

  if (!date || !placeName || !placeAddress) {
    return res.status(400).json({ error: "Date, place name, and place address are required." });
  }

  const placeImage = req.files.image;

  const result = await cloudinary.uploader.upload(placeImage.tempFilePath, {
    folder: "atharvVisited",
  });

  const visitedPlace = new VisitedPlace({
    userId,
    date,
    placeName,
    placeAddress,
    placeImage: result.secure_url,
  });

  await visitedPlace.save();
  res.status(201).json({success:"true"});
};

const getVisitedPlaces = async (req, res) => {
  const { userId } = req.user;
  const visitedPlaces = await VisitedPlace.find({ userId });
  res.status(200).json(visitedPlaces);
};

module.exports = {
  saveVisitedPlace,
  getVisitedPlaces,
};
