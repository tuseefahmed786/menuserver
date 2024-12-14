const mongoose = require("mongoose");

const SocialLinksSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  googleMapLink: { type: String, required: true },
  facebookLink: { type: String, required: true },
  instagramLink: { type: String, required: true },
  whatsappLink: { type: String, required: true },
});

module.exports = mongoose.model("SocialLinks", SocialLinksSchema);
