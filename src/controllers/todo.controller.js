import ToDo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const userId = req.user._id;

  const dateNow = new Date();
  const dateWithNewYear = dateNow.setFullYear(dateNow.getFullYear() + 1);

  const deadLine = req.body.deadLine || dateWithNewYear;

  const toDo = await ToDo.create({ ...req.body, deadLine, userId });
  res.status(201).json(toDo);
};

export const getTodos = async (req, res) => {
  const userId = req.user._id;
  const toDos = await ToDo.find({ userId });

  return res.json(toDos);
};

export const getTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const toDo = await ToDo.findOne({ _id: id, userId });

  return res.json(toDo);
};

export const deleteTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const toDo = await ToDo.findOneAndDelete({ _id: id, userId });

  return res.json(toDo);
};

export const updateTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const updatedTodo = await ToDo.findOneAndUpdate(
    { _id: id, userId },
    req.body,
    {
      new: true,
    }
  );

  return res.json(updatedTodo);
};
