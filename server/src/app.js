const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const userRouter = require("./router/userRouter");
const weaponRouter = require("./router/weaponRouter");
const factionRouter = require("./router/factionRouter");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use("/api/v2", userRouter);
app.use("/api/v2", weaponRouter);
app.use("/api/v2", factionRouter);
