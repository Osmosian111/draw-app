require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/common/config";
import { CreateUserSchema, LoginUserSchema } from "@repo/common/types";
import prisma from "@repo/db/prisma";

import drawings from "./drawings";
import auth from "./middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

// Add new user
app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error });
    return;
  }

  const hash = bcrypt.hashSync(parsedData.data.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: parsedData.data.email,
        password: hash,
        name: parsedData.data.username,
      },
    });
    res.json({
      msg: "User created",
    });
    return;
  } catch (error) {
    res.json({
      msg: "User already exist",
    });
    return;
  }
});

// Login as existing user
app.post("/login", async (req, res) => {
  const parsedData = LoginUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ msg: parsedData.error });
    return;
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!user) {
      res.json({ msg: "Email and Password combination is wrong" });
      return;
    }
    const compare = bcrypt.compareSync(parsedData.data.password, user.password);
    if (!compare) {
      res.json({ msg: "Email and Password combination is wrong" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET ?? " ");
    res.header(
      "Set-Cookie",
      serialize("draw-app-token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      })
    );
    res.json({ token });
    return;
  } catch (error) {
    res.json({ msg: "User does not exist" });
    return;
  }
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
