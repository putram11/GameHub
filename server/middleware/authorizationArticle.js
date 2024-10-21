const { Article, User } = require("../models");
const { verifyToken } = require("../helpers/jsonwebtoken");

const authorizationArticle = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if authorization header is provided
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify and decode the token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request for further use
    req.user = user;

    // Admin users have full access
    if (user.role === "Admin") {
      return next();
    }

    // Staff users can only access their own articles
    const { id } = req.params;
    if (user.role === "Staff" && id) {
      const article = await Article.findByPk(id);

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      // Ensure the staff owns the article
      if (article.authorId !== user.id) {
        return res.status(403).json({ error: "Forbidden: You do not own this article" });
      }

      // Proceed if the user owns the article
      return next();
    }

    // If no specific checks apply, allow the request to proceed
    return next();

  } catch (error) {
    // Handle any errors during authentication/authorization
    console.error(error);
    return res.status(401).json({ error: "Invalid token", details: error.message });
  }
};

module.exports = authorizationArticle;
