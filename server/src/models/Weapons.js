const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const weaponSchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    types: [
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
    ],
  },
  {
    timestamps: true,
  }
);

const Weapon = mongoose.models.Weapon || mongoose.model("Weapon", weaponSchema);
module.exports = Weapon;
