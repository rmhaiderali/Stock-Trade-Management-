import express from "express";

const app = express();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API is working");
});

export default app;
