import express from "express";

import drawings from "./router/drawings";

const app = express();
const PORT = 3001;

app.use(express.json());

// Add new user
app.post("/signup", (req, res) => {
  res.json({ msg: "signup" });
});

// Login as existing user
app.post("/login", (req, res) => {
  res.json({ msg: "login" });
});

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
