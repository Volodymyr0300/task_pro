import { ToDo } from "../schema/todo.schema.js";

export const createTodo = async (req, res) => {
  let { title, content, priority, deadLine, status } = req.body;

  let dateNow = new Date();
  const dateWithNewYear = dateNow.setFullYear(dateNow.getFullYear() + 1);

  deadLine ? deadLine : (deadLine = dateWithNewYear);

  const toDo = await ToDo.create({
    title,
    content,
    priority,
    deadLine,
    status,
  });
  res.status(201).json(toDo);
};

export const getTodos = async (req, res) => {
  const toDos = await ToDo.find();

  res.send(toDos);
};

export const getTodoByID = async (req, res) => {
  const { todoId } = req.params;

  const toDo = await ToDo.findOne({ _id: todoId });

  res.send(toDo);
};

export const deleteTodoByID = async (req, res) => {
  const { todoId } = req.params;

  const toDo = await ToDo.findByIdAndDelete({ _id: todoId });

  res.send(toDo);
};
