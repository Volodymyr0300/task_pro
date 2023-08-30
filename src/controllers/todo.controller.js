import { ToDo } from "../schema/todo.schema.js";

export const createTodo = async (req, res) => {
  let { title, content, table, priority, deadLine, status } = req.body;

  let dateNow = new Date();
  const dateWithNewYear = dateNow.setFullYear(dateNow.getFullYear() + 1);

  deadLine ? deadLine : (deadLine = dateWithNewYear);

  const toDo = await ToDo.create({
    title,
    content,
    table,
    priority,
    deadLine,
    status,
  });
  res.status(201).json(toDo);
};

export const getTodos = async (req, res) => {
  const toDos = await ToDo.find();

  return res.status(200).send(toDos);
};

export const getTodoByID = async (req, res) => {
  const { todoId } = req.params;

  const toDo = await ToDo.findOne({ _id: todoId });

  return res.status(200).send(toDo);
};

export const deleteTodoByID = async (req, res) => {
  const { todoId } = req.params;

  const toDo = await ToDo.findByIdAndDelete({ _id: todoId });

  return res.status(200).send(toDo);
};

export const updateTodoByID = async (req, res) => {
  const { todoId } = req.params;

  const updatedTodo = await ToDo.findByIdAndUpdate({ _id: todoId }, req.body, {
    new: true,
  });

  return res.status(200).send(updatedTodo);
};

export const getTodosByTable = async (req, res) => {
  try {
    const { table } = req.params;

    // console.log(table);

    const todosByTable = await ToDo.find({ table });

    res.send(todosByTable);
  } catch (error) {
    console.log(error.message);
  }
};
