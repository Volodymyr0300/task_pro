import ToDo from "../models/todo.model.js";

export const isTodoExist = async (req, res, next) => {
  const todo = await ToDo.findById(req.params.id);

  if (!todo) {
    return res.status(404).send("todo isn't found");
  }
  next();
};

export default isTodoExist;
