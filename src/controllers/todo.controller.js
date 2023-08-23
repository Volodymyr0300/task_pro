import { ToDo } from "../schema/todo.schema.js";

export const createTodo = async (req, res) => {
  const toDo = await ToDo.create(req.body);
  res.status(201).json(toDo);
};

export const getTodos = async (req, res) => {
  const toDos = await ToDo.find();

  res.send(toDos);
};
