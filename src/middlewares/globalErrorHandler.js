const globalErrorHandler = (error, req, res, next) => {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal server error" });
};

export default globalErrorHandler;
