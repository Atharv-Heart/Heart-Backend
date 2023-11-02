const Event = require("../models/Event");
const cloudinary = require("cloudinary").v2;

const createEvent = async (req, res) => {
  try {
    const { userId } = req.user;
    const { date, name, location, time, description, saved } = req.body;

    if (!date) {
      return res.status(400).json({ error: "All date are required." });
    }
    if (!name) {
      return res.status(400).json({ error: "All name are required." });
    }
    if (!location) {
      return res.status(400).json({ error: "All loc are required." });
    }
    if (!time) {
      return res.status(400).json({ error: "All time are required." });
    }
    if (!description) {
      return res.status(400).json({ error: "All desc are required." });
    }
    if (!saved) {
      return res.status(400).json({ error: "All saced are required." });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const image = req.files.image;

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "atharvEvents",
    });

    const event = new Event({
      userId,
      date,
      name,
      location,
      time,
      description,
      imageUrl: result.secure_url,
      saved,
    });
    await event.save();

    res.status(201).json({ success: "true" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events." });
  }
};

const updateEvents = async (req, res) => {
  try {
    const { userId } = req.user;
    const { eventId } = req.params;
    console.log(userId, eventId)
    const event = await Event.findOne({ _id: eventId, userId });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    event.saved = !event.saved;
    await event.save();

    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// app.put("/events/:eventId/toggleSaved", verifyToken, async (req, res) => {

module.exports = {
  createEvent,
  getEvents,
  updateEvents
};
