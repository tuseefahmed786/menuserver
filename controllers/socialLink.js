const SocialLinks = require("../schema/socialLinks"); // Import the schema

exports.socialLink = async (req, res) => {
  try {
    const userId = req.user?.userId; // Ensure userId exists
    const { googleMapLink, facebookLink, instagramLink, whatsappLink } =
      req.body;

    console.log({
      userId,
      googleMapLink,
      facebookLink,
      instagramLink,
      whatsappLink,
    });

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    // Create and save social links
    const socialLinks = new SocialLinks({
      userId,
      googleMapLink,
      facebookLink,
      instagramLink,
      whatsappLink,
    });

    await socialLinks.save();
    res.status(201).send(socialLinks);
  } catch (error) {
    console.error("Error saving social links:", error);
    res
      .status(500)
      .json({ message: "Error saving links", error: error.message });
  }
};

exports.socialLink = async (req, res) => {
  try {
    const userId = req.user?.userId; // Ensure userId exists
    const { googleMapLink, facebookLink, instagramLink, whatsappLink } =
      req.body;

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    // Check if social links already exist for the user
    let socialLinks = await SocialLinks.findOne({ userId });

    if (socialLinks) {
      // Update existing social links
      socialLinks.googleMapLink = googleMapLink || socialLinks.googleMapLink;
      socialLinks.facebookLink = facebookLink || socialLinks.facebookLink;
      socialLinks.instagramLink = instagramLink || socialLinks.instagramLink;
      socialLinks.whatsappLink = whatsappLink || socialLinks.whatsappLink;

      await socialLinks.save(); // Save updated links
      return res
        .status(200)
        .send({ message: "Social links updated successfully", socialLinks });
    }

    // Create new social links if none exist
    socialLinks = new SocialLinks({
      userId,
      googleMapLink,
      facebookLink,
      instagramLink,
      whatsappLink,
    });

    await socialLinks.save(); // Save new social links
    res
      .status(201)
      .send({ message: "Social links created successfully", socialLinks });
  } catch (error) {
    console.error("Error saving social links:", error);
    res
      .status(500)
      .json({ message: "Error saving links", error: error.message });
  }
};
