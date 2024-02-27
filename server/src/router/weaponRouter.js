const { Router } = require("express");
const router = Router();

const weaponController = require("../controller/weaponsController");

router.post("/weapons", weaponController.postWeapon);
router.get("/weapons", weaponController.getWeapons);
router.get("/weapon/:id", weaponController.getWeaponById);
router.delete("/weapon/:id", weaponController.deleteWeapon);

module.exports = router;
