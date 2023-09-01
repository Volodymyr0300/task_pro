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
import { login, register } from "./controllers/user.controler.js";
import { isTableExist } from "./middlewares/isTableExist.js";
import { isTodoExist } from "./middlewares/isTodoExist.js";
import validateRequest from "./middlewares/validateRequest.js";
import { todoSchema } from "./models/todo.model.js";
import { loginSchema, userSchema } from "./models/user.model.js";

export default function routes(app) {
  app.get("/healthcheck", (req, res) => {
    res.send("server is working");
  });

  app.post("/api/todo", validateRequest(todoSchema), createTodo);
  app.get("/api/todos", getTodos);
  app.get("/api/todos/:todoId", isTodoExist, getTodoByID);
  app.delete("/api/todos/:todoId", isTodoExist, deleteTodoByID);
  app.patch("/api/todos/:todoId", isTodoExist, updateTodoByID);

  app.get("/api/todosByTable/:table", isTableExist, getTodosByTable);
  app.delete("/api/todosByTable/:table", isTableExist, deleteTododsByTable);
  app.patch("/api/todosByTable/:table", isTableExist, updateTodosTableName);

  app.post("/api/user/register", validateRequest(userSchema), register);
  app.post("/api/user/login", validateRequest(loginSchema), login);
}
