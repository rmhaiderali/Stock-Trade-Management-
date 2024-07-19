import "dotenv/config.js";
import express from "express";
import app from "./app.js";

app.use(express.static("dist"), (req, res) => {
  res.sendFile("dist/index.html", { root: process.cwd() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("server started: http://localhost:" + PORT));
