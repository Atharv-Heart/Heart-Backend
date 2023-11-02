const cloudinary = require("cloudinary").v2;
const Deals = require("../models/Deals");

const createDeal = async (req, res) => {
  try {
    const { userId } = req.user;
    const { text, advertisement } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required." });
    }


    const image = req.files.image;

    let folder;
    let isAdvertisement;

    if (advertisement === "true") {
      folder = "atharvAdvertisements";
      isAdvertisement = true;
    } else {
      folder = "atharvDeals";
      isAdvertisement = false;
    }

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: folder,
    });

    const deal = new Deals({
      userId,
      imageUrl: result.secure_url,
      text,
      advertisement: isAdvertisement,
    });

    await deal.save();
    res.status(201).json({
      message: isAdvertisement
        ? "Advertisement created successfully."
        : "Deal created successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating a deal." });
  }
};

const getDeals = async (req, res) => {
  try {
    const deals = await Deals.find({
      advertisement: false,
      imageUrl: { $regex: /atharvDeals/ },
    });
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching deals." });
  }
};

const getAdvertisements = async (req, res) => {
  try {
    const advertisements = await Deals.find({
      advertisement: true,
      imageUrl: { $regex: /atharvAdvertisements/ },
    });
    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({ error: "Error fetching advertisements." });
  }
};

module.exports = {
  createDeal,
  getDeals,
  getAdvertisements,
};
