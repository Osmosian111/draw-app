import { JWT_SECRET } from "@repo/common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {parse} from "cookie"

export default function auth(req: Request, res: Response, next: NextFunction) {
  const cookie = parse(req.body.cookie || " ")
  const token = cookie["draw-app-token"];
  if (!token || !JWT_SECRET) {
    res.json({ msg: "Signup first" });
    return;
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    if (!decode) return;
    next();
    return;
  } catch (error) {
    console.log(error);
    res.json({ msg: "error" });
  }
}
