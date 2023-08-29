import { ToDo } from "../schema/todo.schema.js";

export const isTodoExist = async (req, res, next) => {
  const todo = await ToDo.findOne({ _id: req.params.todoId });

  if (!todo) {
    return res.status(404).send("todo isn't found");
  }
  next();
};
