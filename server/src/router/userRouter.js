const { Router } = require("express");
const router = Router();

const userController = require("../controller/userController");
const signUpValidator = require("../validations/signUp");

router.post("/signup", signUpValidator, userController.signUp);
router.post("/signin", userController.signIn);
router.get("/avatars", userController.getAvatars);
router.post("/avatars", userController.postAvatars);
router.get("/verify", userController.verifyToken);

module.exports = router;
