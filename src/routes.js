import {
  createTodo,
  getTodos,
  getTodoByID,
  deleteTodoByID,
} from "./controllers/todo.controller.js";
import { isTodoExist } from "./middlewares/isTodoExist.js";
import validateRequest from "./middlewares/validateRequest.js";
import { todoSchema } from "./models/todo.model.js";

export default function routes(app) {
  app.get("/healthcheck", (req, res) => {
    res.send("server is working");
  });

  app.post("/api/todo", validateRequest(todoSchema), createTodo);
  app.get("/api/todos", getTodos);
  app.get("/api/todos/:todoId", isTodoExist, getTodoByID);
  app.delete("/api/todos/:todoId", isTodoExist, deleteTodoByID);
}
