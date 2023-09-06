import {
  createTodo,
  getTodos,
  getTodoByID,
  deleteTodoByID,
  updateTodoByID,
  getTodosByTable,
  deleteTododsByTable,
  updateTodosTableName,
} from "./controllers/todo.controller.js";
import { login, logout, register } from "./controllers/user.controler.js";
import { authenticate } from "./middlewares/authenticate.js";
import { isTableExist } from "./middlewares/isTableExist.js";
import { isTodoExist } from "./middlewares/isTodoExist.js";
import validateRequest from "./middlewares/validateRequest.js";
import { todoSchema } from "./models/todo.model.js";
import { loginSchema, userSchema } from "./models/user.model.js";

export default function routes(app) {
  app.get("/healthcheck", (req, res) => {
    res.send("server is working");
  });

  app.post("/api/todo", authenticate, validateRequest(todoSchema), createTodo);
  app.get("/api/todos", authenticate, getTodos);
  app.get("/api/todos/:todoId", authenticate, isTodoExist, getTodoByID);
  app.delete("/api/todos/:todoId", authenticate, isTodoExist, deleteTodoByID);
  app.patch("/api/todos/:todoId", authenticate, isTodoExist, updateTodoByID);

  app.get(
    "/api/todosByTable/:table",
    authenticate,
    isTableExist,
    getTodosByTable
  );
  app.delete(
    "/api/todosByTable/:table",
    authenticate,
    isTableExist,
    deleteTododsByTable
  );
  app.patch(
    "/api/todosByTable/:table",
    authenticate,
    isTableExist,
    updateTodosTableName
  );

  app.post("/api/user/register", validateRequest(userSchema), register);
  app.post("/api/user/login", validateRequest(loginSchema), login);
  app.post("/api/user/logout", authenticate, logout);
}
