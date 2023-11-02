const cloudinary = require("cloudinary").v2;
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  try {
    const { userId } = req.user;
    const { text } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "atharvFolder",
    });

    const imageUrl = new Image({ userId, imageUrl: result.secure_url, text });
    await imageUrl.save();
    res.status(201).json({ success: "true" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image." });
  }
};

const getImages = async (req, res) => {
  try {
    const { userId } = req.user;
    const images = await Image.find({ userId });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Error fetching advertisements." });
  }
};

module.exports = {
  uploadImage,
  getImages,
};
