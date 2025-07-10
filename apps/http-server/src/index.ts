require("dotenv").config();

import express from "express";
import v1 from "./v1"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1",v1)

app.listen(PORT);
