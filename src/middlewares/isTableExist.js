import { ToDo } from "../schema/todo.schema.js";

export const isTableExist = async (req, res, next) => {
  const todo = await ToDo.find({ table: req.params.table });

  if (todo.length === 0) {
    return res.status(404).send("table isn't find");
  }
  next();
};
