import {
  createTodo,
  getTodos,
  getTodoByID,
  deleteTodoByID,
  updateTodoByID,
  getTodosByTable,
  //   deleteTododsByTable,
  //   updateTodosTableName,
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
  app.patch("/api/todos/:todoId", isTodoExist, updateTodoByID);

  app.get("/api/todos/:table", getTodosByTable);
  //   app.delete("/api/todos/:tableName", deleteTododsByTable);
  //   app.patch("/api/todos/:tableName", updateTodosTableName);
}
