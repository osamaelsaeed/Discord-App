import express from "express";
import "dotenv/config.js";
import { ENV } from "./config/env.js";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const PORT = ENV.PORT;
const MONGO_URI = ENV.MONGO_URI;
const app = express();

app.use(express.json()); // for JSON APIs
app.use(express.urlencoded({ extended: true })); // for HTML forms
app.use(
  cors({
    origin: ENV.CLIENT_PORT,
    credentials: true,
  })
);
//register auth routes to the app
app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`Connect successfully to ${MONGO_URI}`))
  .catch((error) => console.log("error connecting", error));

//customizing our server to gain more control to add websockets
const server = http.createServer(app);

server.listen(PORT, () => console.log(`server run on port ${PORT}`));
