import express from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.post("/", (req, res) => {
  res.json("post");
});

app.listen(PORT);
