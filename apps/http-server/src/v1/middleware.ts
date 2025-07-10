import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

import { JWT_SECRET } from "@repo/common/config";
import { JwtPayload, NewRequest } from "@repo/common/interfaces";

export default function auth(
  req: NewRequest,
  res: Response,
  next: NextFunction
) {
  const cookie = parse(req.body.cookie || " ");
  const token = cookie["draw-app-token"];
  if (!token || !JWT_SECRET) {
    res.json({ msg: "Signup first" });
    return;
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decode || decode.userId) return;
    req.body.userId = decode.userId;
    next();
    return;
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
}
