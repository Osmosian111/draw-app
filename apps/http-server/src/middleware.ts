import { JWT_SECRET } from "@repo/common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
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
