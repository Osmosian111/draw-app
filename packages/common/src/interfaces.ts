import { Request } from "express";

export interface NewRequest extends Request {
  userId?: string;
}

export interface JwtPayload {
  userId?: string;
}