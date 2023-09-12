import Board from "../models/board.model.js";
import ToDo from "../models/todo.model.js";

export const getBoards = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Board.find({ userId });

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const addBoard = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Board.create({ ...req.body, userId });

    res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBoardByID = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  const board = await Board.findOne({ _id: id, userId });

  const todos = await ToDo.find({ userId, board: id });

  return res.json({ board, todos });
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

export const deleteBoardByID = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    await ToDo.deleteMany({ board: id, userId });

    await Board.findOneAndDelete({ userId, _id: id });

    res.send(`todos by board ${id} were delete`);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateBoardByID = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await Board.findOneAndUpdate({ _id: id, userId }, req.body, {
      new: true,
    });

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};
