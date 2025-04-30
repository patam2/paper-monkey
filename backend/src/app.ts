import express from "express";
import router from "./routes/apiRoutes";

const app = express();
export default app


app.use(express.json());
app.use(router)
