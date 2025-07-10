import { DrawingSchema, UpdateDrawingSchema } from "@repo/common/types";
import prisma from "@repo/db/prisma";
import id from "./id/index"

import { Router } from "express";

const router = Router();

router.use("/:id",id)

// Save a new drawing
router.post("/", async (req, res) => {
  const parsedData = DrawingSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      msg: "Error",
    });
    return;
  }
  const drawingData = parsedData.data;
  try {
    await prisma.drawing.create({
      data: {
        title: drawingData.title,
        data: drawingData.data,
        thumbnail: drawingData.thumbnail,
        userId: drawingData.userId,
        isPublic: drawingData.isPublic,
      },
    });
    res.json({
      msg: "Saved!",
    });
  } catch (error) {
    res.json({
      msg: "Reponse failed",
    });
    return;
  }
});

// Get all drawings
router.get("/", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    res.json({
      msg: "Auth error",
    });
    return;
  }
  const drawingData = await prisma.drawing.findMany({
    where: {
      userId,
    },
  });
  res.send({ drawingData });
});

export default router;
