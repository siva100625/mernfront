const Reply = require("../models/Reply");

const createReply = async (req, res) => {
  try {
    // Ensure user ID is attached
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const newReply = new Reply({
      postId: req.body.postId,
      userId: req.user._id, // Use the authenticated user
      content: req.body.content,
    });

    await newReply.save();
    res.status(201).json(newReply);
  } catch (error) {
    console.error("❌ Reply Creation Error:", error); // More detailed error logging
    res.status(500).json({ error: "Failed to create reply", details: error.message });
  }
};

const getRepliesByPost = async (req, res) => {
  try {
    const replies = await Reply.find({ postId: req.params.postId }).populate("userId", "username");
    res.json(replies);
  } catch (error) {
    console.error("❌ Failed to retrieve replies:", error);
    res.status(500).json({ error: "Failed to retrieve replies", details: error.message });
  }
};

module.exports = {
  createReply,
  getRepliesByPost,
};
