const { Router } = require("express");
const router = Router();

const factionController = require("../controller/factionsController");

router.get("/factions", factionController.getFactions);
router.post("/factions", factionController.postFactions);
router.put("/factions/like/:id", factionController.likeFaction);
router.put("/factions/dislike/:id", factionController.dislikeFaction);

module.exports = router;
