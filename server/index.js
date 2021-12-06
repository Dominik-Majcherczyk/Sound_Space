import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import songsRoutes from "./routes/songs.js";
import userRoutes from "./routes/users.js";

const app = express();

dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/songs", songsRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
   .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
   .catch((error) => console.log(erro.message));
