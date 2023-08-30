import express from "express";
import "dotenv/config";
import routes from "./src/routes.js";
import { runMongo } from "./db.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.js";

const app = express();
app.use(express.static("src/frontEnd/css"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is run on port ${process.env.PORT}`);

  runMongo();
  routes(app);
});
