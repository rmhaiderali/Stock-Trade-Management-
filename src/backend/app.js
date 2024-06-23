import "./config/database.js";
import "./utils/ensureEnv.js";
import express from "express";
import cookieParser from "cookie-parser";
import asyncErrorHandler from "./utils/asyncErrorHandler.js";
import signUp from "./controllers/signUp.controller.js";
import signIn from "./controllers/signIn.controller.js";
import signOut from "./controllers/signOut.controller.js";
import changeName from "./controllers/changeName.controller.js";
import validateUser from "./controllers/validateUser.controller.js";
import suggestUsingAI from "./controllers/suggestUsingAI.controller.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/api/signup", asyncErrorHandler(signUp));
app.post("/api/signin", asyncErrorHandler(signIn));
app.post("/api/signout", asyncErrorHandler(signOut));
app.post("/api/changename", asyncErrorHandler(changeName));
app.get("/api/validateuser", asyncErrorHandler(validateUser));
app.post("/api/suggestUsingAI", asyncErrorHandler(suggestUsingAI));

app.use((err, req, res, next) => {
  return res.status(500).json({ success: false, message: err.message });
});

export default app;
