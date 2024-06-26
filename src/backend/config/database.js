import mongoose from "mongoose";

const { log } = console;

const MONGODB_URI = "mongodb+srv://admin:nwui7378@cluster0.jvyr9g8.mongodb.net/stock-trade-management"
  

mongoose.connection.on("error", (err) => console.error(err));

mongoose.connection.once("open", () => log("connected to the mongodb"));

await mongoose.connect(MONGODB_URI);
