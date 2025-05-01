import express from "express";
import apiRouter from "./routes/Auth";
import { newsletterRouter } from "./routes/Newsletter";
import cors from 'cors'
const app = express();


app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json());
app.use("/auth", apiRouter)
app.use('/newsletter', newsletterRouter)


export default app