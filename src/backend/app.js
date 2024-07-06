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
import {
  createLinkToken,
  exchangePublicToken,
  balance,
  investmentHoldings,
  getPositions,
} from "./controllers/plaid.controllers.js";
import queryUser from "./middlewares/queryUser.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/api/signup", asyncErrorHandler(signUp));
app.post("/api/signin", asyncErrorHandler(signIn));
app.post("/api/signout", asyncErrorHandler(signOut));
app.post("/api/changename", queryUser, asyncErrorHandler(changeName));
app.get("/api/validateuser", queryUser, asyncErrorHandler(validateUser));
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
app.get("/api/plaid/balance", queryUser, asyncErrorHandler(balance));
app.get(
  "/api/plaid/investmentHoldings",
  queryUser,
  asyncErrorHandler(investmentHoldings)
);
app.get(
  "/api/plaid/getPositions",
  queryUser,
  asyncErrorHandler(getPositions)
);

app.use((err, req, res, next) => {
  return res.status(500).json({ success: false, message: err.message });
});

export default app;
