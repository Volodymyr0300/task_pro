import { ToDo } from "../schema/todo.schema.js";

export const createTodo = async (req, res) => {
  let { title, content, table, priority, deadLine, status } = req.body;

  const userId = req.user._id;

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
    userId,
  });
  res.status(201).json(toDo);
};

export const getTodos = async (req, res) => {
  const userId = req.user._id;
  const toDos = await ToDo.find({ userId });

  return res.status(200).send(toDos);
};

export const getTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { todoId } = req.params;

  const toDo = await ToDo.findOne({ _id: todoId, userId });

  return res.status(200).send(toDo);
};

export const deleteTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { todoId } = req.params;

  const toDo = await ToDo.findOneAndDelete({ _id: todoId, userId });

  return res.status(200).send(toDo);
};

export const updateTodoByID = async (req, res) => {
  const userId = req.user._id;
  const { todoId } = req.params;

  const updatedTodo = await ToDo.findOneAndUpdate(
    { _id: todoId, userId },
    req.body,
    {
      new: true,
    }
  );

  return res.status(200).send(updatedTodo);
};

export const getTodosByTable = async (req, res) => {
  try {
    const userId = req.user._id;
    const { table } = req.params;

    const todosByTable = await ToDo.find({ table, userId });

    res.send(todosByTable);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTododsByTable = async (req, res) => {
  try {
    const userId = req.user._id;
    const { table } = req.params;

    await ToDo.deleteMany({ table, userId });

    res.status(200).send(`todos by table ${table} were delete`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTodosTableName = async (req, res) => {
  try {
    const userId = req.user._id;
    const { table } = req.params;

    const todosByTable = await ToDo.updateMany(
      { table, userId },
      { table: req.body.table }
    );

    res.status(200).send(todosByTable);
  } catch (error) {
    console.log(error.message);
  }
};
