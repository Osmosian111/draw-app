import { DrawingSchema } from "@repo/common/types";
import prisma from "@repo/db/prisma";
import express, { Router } from "express";

const router = Router();

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

// Get a specific drawing by ID
router.get("/:id", async (req, res) => {
  const userId = req.body.userId;
  const id = req.params.id;
  const drawingData = await prisma.drawing.findUnique({
    where: {
      userId,
      id,
    },
  });
  res.send({ drawingData });
});

// Update an existing drawing
router.put("/:id", (req, res) => {
  res.send({ msg: "drawings" });
});

// Delete a drawing
router.delete("/:id", (req, res) => {
  res.send({ msg: "drawings" });
});

// Share drawing
router.post("/:id/share", (req, res) => {
  res.send({ msg: "drawings" });
});
export default router;
