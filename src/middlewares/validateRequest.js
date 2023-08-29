const validateRequest = (schema) => {
  const validate = (req, res, next) => {
    console.log(req.body);

    const { error } = schema.validate(req.body);

    if (error) {
      next(error);
    }
    next();
  };
  return validate;
};

export default validateRequest;
