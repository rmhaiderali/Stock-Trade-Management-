import "./config/database.js";
import "./utils/ensureEnv.js";
import express from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
import asyncErrorHandler from "./utils/asyncErrorHandler.js";
import signUp from "./controllers/signUp.controller.js";
import signIn from "./controllers/signIn.controller.js";
import signOut from "./controllers/signOut.controller.js";
import changeProfile from "./controllers/changeProfile.controller.js";
import validateUser from "./controllers/validateUser.controller.js";
import suggestUsingAI from "./controllers/suggestUsingAI.controller.js";
import {
  createLinkToken,
  exchangePublicToken,
  investmentHoldings,
  getPositions,
} from "./controllers/plaid.controllers.js";
import queryUser from "./middlewares/queryUser.middleware.js";
import yahooFinances from "./controllers/yahooFinance.controller.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

const upload = multer({ dest: "temp/" });

app.post("/api/signup", asyncErrorHandler(signUp));
app.post("/api/signin", asyncErrorHandler(signIn));
app.post("/api/signout", asyncErrorHandler(signOut));
app.post(
  "/api/changeProfile",
  queryUser,
  upload.single("profilePicture"),
  asyncErrorHandler(changeProfile)
);
app.get("/api/validateUser", queryUser, asyncErrorHandler(validateUser));
app.post("/api/suggestUsingAI", queryUser, asyncErrorHandler(suggestUsingAI));
app.get(
  "/api/plaid/createLinkToken",
  queryUser,
  asyncErrorHandler(createLinkToken)
);
app.post(
  "/api/plaid/exchangePublicToken",
  queryUser,
  asyncErrorHandler(exchangePublicToken)
);
app.get(
  "/api/plaid/investmentHoldings",
  queryUser,
  asyncErrorHandler(investmentHoldings)
);
app.get("/api/plaid/getPositions", queryUser, asyncErrorHandler(getPositions));
app.get("/api/yahooFinance", asyncErrorHandler(yahooFinances));

app.use(express.static("uploads", { maxAge: 86400000 }));

app.use((err, req, res, next) => {
  return res.status(500).json({ success: false, message: err.message });
});

export default app;
