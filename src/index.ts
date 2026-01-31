import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/authRoute";

const app = express();
dotenv.config();

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Port running in http://localhost:${port}`);
});
