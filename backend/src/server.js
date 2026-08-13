import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectedDB, disconnectDB } from "./config/db.js";
import router from "./routers/pokemonRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const corsOptions = {
  origin: "http://localhost:8081",
  methods: "GET, POST, PUT, DELETE",
  allowHeaders: "Content-Type, Authorization",
  credentials: true,
}
app.use(cors(corsOptions));
app.use("/api", router);

const PORT = process.env.PORT;

connectedDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});