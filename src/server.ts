import express, { Application } from "express";
import { appConfig } from "./config/appConfig";
import connectDB from "./db";

const app: Application = express();
app.use(express.json());

connectDB();
app.listen(appConfig.PORT, () => {
  console.log(`Server is running on port ${appConfig.PORT}`);
});
