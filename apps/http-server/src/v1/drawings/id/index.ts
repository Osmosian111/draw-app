import { UpdateDrawingSchema } from "@repo/common/types";
import prisma from "@repo/db/prisma";
import { Router } from "express";

const router = Router();

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
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const parsedData = UpdateDrawingSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      msg: "Error input field are worng",
    });
    return;
  }
  const drawingData = parsedData.data;

  await prisma.drawing.update({
    where: {
      userId,
      id,
    },
    data: drawingData,
  });

  res.send({ msg: "updated" });
});

// Delete a drawing
router.delete("/:id",async (req, res) => {
  const userId = req.body.userId;
  const id = req.params.id;

  await prisma.drawing.delete({
    where: {
      userId,
      id,
    },
  });

  res.send({ msg: "drawing deleted" });
});

// Share drawing
router.patch("/:id/share", (req, res) => {
  res.send({ msg: "drawings" });
});

export default router