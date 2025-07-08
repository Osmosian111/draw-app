import express, { Router } from "express";

const router = Router();

// Save a new drawing
router.post("/", (req,res) => {
    res.send({ msg: "drawings" })
});

router.get("/", (req,res) => {
    res.send({ msg: "drawings" })
});

router.get("/:id", (req,res) => {
    res.send({ msg: "drawings" })
});

router.put("/:id", (req,res) => {
    res.send({ msg: "drawings" })
});

router.delete("/:id", (req,res) => {
    res.send({ msg: "drawings" })
});

router.post("/:id/share", (req,res) => {
    res.send({ msg: "drawings" })
});
export default router;