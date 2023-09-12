import {
  createTodo,
  getTodos,
  getTodoByID,
  deleteTodoByID,
  updateTodoByID,
} from "./controllers/todo.controller.js";
import { login, logout, register } from "./controllers/user.controler.js";
import {
  getBoards,
  addBoard,
  getBoardByID,
  deleteBoardByID,
  updateBoardByID,
} from "./controllers/boards.controler.js";
import {
  authenticate,
  isBoardExist,
  isTodoExist,
} from "./middlewares/index.js";
import { validateRequest } from "./decorators/index.js";
import { addTodoSchema } from "./schemas/todo.schemas.js";
import { loginSchema, registerSchema } from "./schemas/user.schemas.js";

export default function routes(app) {
  app.get("/healthcheck", (req, res) => {
    res.send("server is working");
  });

  app.post("/api/users/register", validateRequest(registerSchema), register);
  app.post("/api/users/login", validateRequest(loginSchema), login);
  app.post("/api/users/logout", authenticate, logout);

  app.get("/api/todos", authenticate, getTodos);

  app.post(
    "/api/todos",
    authenticate,
    validateRequest(addTodoSchema),
    createTodo
  );

  app.get("/api/todos/:id", authenticate, isTodoExist, getTodoByID);
  app.delete("/api/todos/:id", authenticate, isTodoExist, deleteTodoByID);
  app.put("/api/todos/:id", authenticate, isTodoExist, updateTodoByID);

  app.get("/api/boards", authenticate, getBoards);

  app.post("/api/boards", authenticate, addBoard);

  app.get("/api/boards/:id", authenticate, isBoardExist, getBoardByID);

  app.delete("/api/boards/:id", authenticate, isBoardExist, deleteBoardByID);

  app.put("/api/boards/:id", authenticate, isBoardExist, updateBoardByID);

  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/registration", (req, res) => {
    res.render("registration");
  });
  app.get("/login", (req, res) => {
    res.render("login");
  });
  app.get("/main", (req, res) => {
    res.render("main");
  });
}
