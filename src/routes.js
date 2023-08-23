import { createTodo, getTodos } from "./controllers/todo.controller.js";

export default function routes(app) {
  app.get("/healthcheck", (req, res) => {
    res.send("server is working");
  });

  app.post("/api/todo", createTodo);
  app.get("/api/todos", getTodos);
}

