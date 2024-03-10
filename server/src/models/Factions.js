const mongoose = require("mongoose");

const factionSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
  ultra: String,
  passive: String,
  ability: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  usersDisliked: { type: [mongoose.Schema.Types.ObjectId], default: [] },
});

const Faction = mongoose.model("Faction", factionSchema);

module.exports = Faction;
