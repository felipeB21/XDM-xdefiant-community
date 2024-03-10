const jwt = require("jsonwebtoken");
const Faction = require("../models/Factions");
const jwtMiddleware = require("../middleware/validateToken");

module.exports = {
  getFactions: async (req, res) => {
    try {
      const factions = await Faction.find();
      res.json(factions);
    } catch (error) {
      console.error("Error fetching factions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  postFactions: async (req, res) => {
    try {
      const { name, imageUrl, description, ultra, passive, ability } = req.body;

      if (
        !name ||
        !imageUrl ||
        !description ||
        !ultra ||
        !passive ||
        !ability
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newFaction = new Faction({
        name,
        imageUrl,
        description,
        ultra,
        passive,
        ability,
      });

      await newFaction.save();
      res.status(201).json(newFaction);
    } catch (error) {
      console.error("Error creating faction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  likeFaction: async (req, res) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.id;

      const { id } = req.params;
      const foundFaction = await Faction.findById(id);

      if (!foundFaction) {
        return res.status(404).json({ error: "Faction not found" });
      }

      if (foundFaction.usersLiked.includes(userId)) {
        return res
          .status(400)
          .json({ error: "You have already liked this faction" });
      }

      foundFaction.likes++;
      foundFaction.usersLiked.push(userId);
      await foundFaction.save();
      res.json(foundFaction);
    } catch (error) {
      console.error("Error liking faction:", error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },

  dislikeFaction: async (req, res) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userId = decoded.id;

      const { id } = req.params;
      const foundFaction = await Faction.findById(id);

      if (!foundFaction) {
        return res.status(404).json({ error: "Faction not found" });
      }

      if (foundFaction.usersDisliked.includes(userId)) {
        return res
          .status(400)
          .json({ error: "You have already disliked this faction" });
      }

      foundFaction.dislikes++;
      foundFaction.usersDisliked.push(userId);
      await foundFaction.save();
      res.json(foundFaction);
    } catch (error) {
      console.error("Error disliking faction:", error);
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
