import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import { appConfig } from "./config/appConfig";
import connectDB from "./db";
import apiRoutes from "./routes/api";

const app: Application = express();
const swaggerDocument = yaml.load(
  fs.readFileSync("./swagger.yaml", "utf8")
) as Record<string, any>;

app.use(express.json());

connectDB();


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {}, {
    explorer: true,
    docExpansion: "list",
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  })
);



app.use("/api", apiRoutes);

app.listen(appConfig.PORT, () => {
  console.log(`Server is running on port ${appConfig.PORT}`);
});
