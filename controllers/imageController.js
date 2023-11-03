const cloudinary = require("cloudinary").v2;
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "atharvFolder",
    });

    const imageUrl = new Image({ imageUrl: result.secure_url, text });
    await imageUrl.save();
    res.status(201).json({ success: "true" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image." });
  }
};

const getImages = async (req, res) => {
  const folder = "atharvFolder";

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .execute();

    const urls = result.resources.map((resource) => resource.url);

    res.status(200).json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

module.exports = {
  uploadImage,
  getImages,
};
