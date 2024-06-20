import "dotenv/config.js";
import express from "express";
import app from "./app.js";

app.use(express.static("dist"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server started: http://localhost:" + PORT));
