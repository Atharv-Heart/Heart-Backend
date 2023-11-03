const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  
  imageUrl: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
