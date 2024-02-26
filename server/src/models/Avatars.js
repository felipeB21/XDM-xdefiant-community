const mongoose = require("mongoose");
const { Schema } = mongoose;

const avatarSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Avatar = mongoose.models.Avatar || mongoose.model("Avatar", avatarSchema);

module.exports = Avatar;
