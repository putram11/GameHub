const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueValidationError":
      status = 400;
      message = err.errors?.[0]?.message || "Validation error";
      break;
    case "InvalidInput":
      status = 401;
      message = "Please insert your email and password";
      break;
    case "NoDataProvided":
      status = 401;
      message = "Please provide the data";
      break;
    case "ForbiddenError":
      status = 403;
      message = err.errors?.[0]?.message || "Forbidden access";
      break;
    case "NoUser":
    case "NotFoundError":
      status = 404;
      message = "Data not found";
      break;
    default:
      // Default fallback if error name doesn't match any case
      status = err.status || 500;
      message = err.message || "Internal server error";
      break;
  }

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
