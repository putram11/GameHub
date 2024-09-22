const { Article } = require("../models");
const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authorizationArticle = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;

    if (user.role === "Admin") {
      return next();
    }

    // Jika pengguna adalah staff, periksa kepemilikan artikel
    const { id } = req.params;

    if (user.role === "Staff" && id) {
      const article = await Article.findByPk(id);

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      if (article.authorId !== user.id) {
        return res
          .status(403)
          .json({ error: "Forbidden: You do not own this article" });
      }

      return next();
    }

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ error: "Invalid token", details: error.message });
  }
};

module.exports = authorizationArticle;
