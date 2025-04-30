import express from "express";
import apiRouter from "./routes/Auth";

const app = express();


app.use(express.json());
app.use("/auth", apiRouter)

export default app