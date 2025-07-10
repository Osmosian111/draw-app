import { Router } from "express";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

import { JWT_SECRET } from "@repo/common/config";
import { CreateUserSchema, LoginUserSchema } from "@repo/common/types";
import prisma from "@repo/db/prisma";
import auth from "./middleware";

import drawings from "./drawings"

const router = Router()

// Add new user
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
      serialize("draw-router-token", token, {
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

router.use(auth);

// for /drawings route
router.use("/drawings", drawings);

//  Get current logged-in user
router.get("/me", (req, res) => {
  res.json({ msg: "me" });
});

// View shared drawing
router.get("/public/:id", (req, res) => {
  res.json({ msg: "public" });
});

// Status of web page
router.post("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    version: "1.0.0",
  });
});

export default router