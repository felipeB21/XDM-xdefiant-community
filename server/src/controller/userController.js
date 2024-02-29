const User = require("../models/User");
const Avatar = require("../models/Avatars");
const bcrypt = require("bcrypt");
const createAccesToken = require("../lib/jwt");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const avatarsDirectory = path.join(__dirname, "../../public/avatars");

module.exports = {
  signUp: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      const { name, username, email, password, avatar } = req.body;
      const emailExists = await User.findOne({ email });
      const userExists = await User.findOne({ username });
      if (emailExists) {
        return res
          .status(400)
          .json({ errors: { email: { msg: "Email already in use" } } });
      }
      if (userExists) {
        return res
          .status(400)
          .json({ errors: { username: { msg: "Username already in use" } } });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const selectedAvatar = await Avatar.findOne({ name: avatar });
      if (!selectedAvatar) {
        return res
          .status(404)
          .json({ errors: { avatar: { msg: "Select a valid avatar" } } });
      }

      const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
        avatarId: selectedAvatar._id,
      });
      const userCreated = await user.save();
      const token = await createAccesToken({ id: userCreated._id });
      res.cookie("token", token);
      res.json({
        id: userCreated._id,
        name: userCreated.name,
        username: userCreated.username,
        email: userCreated.email,
        avatarId: userCreated.avatarId,
        createdAt: userCreated.createdAt,
        updatedAt: userCreated.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ errors: { email: { msg: ["Email not found"] } } });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ errors: { password: { msg: "Incorrect password" } } });
      }

      const token = await createAccesToken({ id: user._id });
      res.cookie("token", token);
      res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatarId: user.avatarId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAvatars: async (req, res) => {
    try {
      const avatarFiles = fs.readdirSync(avatarsDirectory);

      const avatars = avatarFiles.map((file) => ({
        name: file,
        imageUrl: `/avatars/${file}`,
      }));

      res.json(avatars);
    } catch (error) {
      console.error("Error al obtener avatares:", error);
      res.status(500).json({ message: error.message });
    }
  },
  postAvatars: async (req, res) => {
    try {
      const { name, imageUrl } = req.body;

      const newAvatar = new Avatar({
        name,
        imageUrl,
      });

      await newAvatar.save();

      res.json(newAvatar);
    } catch (error) {
      console.error("Error al crear avatar:", error);
    }
  },
  verifyToken: async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ message: "Invalid token" });
      const foundUser = await User.findById(user.id).populate("avatarId");
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({
        id: foundUser._id,
        name: foundUser.name,
        username: foundUser.username,
        email: foundUser.email,
        avatarId: foundUser.avatarId,
        createdAt: foundUser.createdAt,
      });
    });
  },
  getUserByIdOrName: async (req, res) => {
    try {
      let user;
      if (req.params.username) {
        user = await User.findOne({ username: req.params.username }).populate(
          "avatarId"
        );
      }

      if (!user) {
        return res.status(404).json({ errors: { msg: "User not found" } });
      }

      res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatarId: user.avatarId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate("avatarId");

      res.json(users);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  },
};
