import Board from "../models/board.model.js";

export const isBoardExist = async (req, res, next) => {
  const board = await Board.findById(req.params.id);

  if (board) {
    return res.status(404).send("board isn't find");
  }
  next();
};

export default isBoardExist;
