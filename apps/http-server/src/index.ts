require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/config";
import { CreateUserSchema, LoginUserSchema } from "@repo/common/types";

import drawings from "./router/drawings";
import auth from "./middleware";

const app = express();
const PORT = 3001;

app.use(express.json());

// Add new user
app.post("/signup", (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error });
    return;
  }
  res.json({ msg: "signup" });
});

// Login as existing user
app.post("/login", (req, res) => {
  const parsedData = LoginUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error });
    return;
  }
  const user = 1;
  const token = jwt.sign({ userId: user }, JWT_SECRET ?? " ");
  res.json({ token });
});

app.use(auth);

// for /drawings route
app.use("/drawings", drawings);

//  Get current logged-in user
app.get("/me", (req, res) => {
  res.json({ msg: "me" });
});

// View shared drawing
app.get("/public/:id", (req, res) => {
  res.json({ msg: "public" });
});

// Status of web page
app.post("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.listen(PORT);
