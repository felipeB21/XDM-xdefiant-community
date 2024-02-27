const Weapon = require("../models/Weapons");
module.exports = {
  postWeapon: async (req, res) => {
    try {
      const { class: classType, types } = req.body;

      const newWeapon = new Weapon({
        class: classType,
        types,
      });

      await newWeapon.save();
      res.json(newWeapon);
    } catch (error) {
      console.error("Error al crear arma:", error);
    }
  },
  getWeapons: async (req, res) => {
    try {
      const weapons = await Weapon.find();
      res.json(weapons);
    } catch (error) {
      console.error("Error al obtener armas:", error);
    }
  },
  getWeaponById: async (req, res) => {
    try {
      const typeId = req.params.id;
      const weapon = await Weapon.findOne({ "types._id": typeId });

      if (!weapon) {
        return res.status(404).json({ message: "Weapon not found" });
      }

      const type = weapon.types.find((type) => type._id.toString() === typeId);

      res.json({ type });
    } catch (error) {
      console.error("Error al obtener arma por ID:", error);
      res.status(500).json({ message: "Weapon not found" });
    }
  },
  deleteWeapon: async (req, res) => {
    try {
      const { id } = req.params;

      const weapon = await Weapon.findOne({ "types._id": id });

      if (!weapon) {
        return res.status(404).json({ message: "Weapon not found" });
      }
      await Weapon.updateOne(
        { _id: weapon._id },
        { $pull: { types: { _id: id } } }
      );
      res.json({ message: "Weapon type deleted successfully" });
    } catch (error) {
      console.error("Error al borrar tipo de arma:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  },
};
