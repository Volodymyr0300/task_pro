import express from "express";
import "dotenv/config";
import routes from "./routes.js";
import { runMongo } from "./db.js";
import { globalErrorHandler } from "./middlewares/index.js";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viewsPath = path.join(__dirname, "views");

const app = express();
app.use(express.static(viewsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(globalErrorHandler);

app.engine("handlebars", engine({ defaultLayout: "pageWrapper" }));
app.set("view engine", "handlebars");
app.set("views", viewsPath);
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`server is run on port ${PORT}`);

  runMongo();
  routes(app);
});
