const ApiError = require("../errors/apiError");

function errorMiddleware(err, req, res, next) {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unexpected error" });
}

module.exports = errorMiddleware;
