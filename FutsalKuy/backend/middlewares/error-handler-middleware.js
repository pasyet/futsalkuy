async function errorHandler(error, req, res, next) {
  let message;
  let status;
  if (error.name === "SequelizeValidationError") {
    let messegeErrorValidation = error.errors.map((el) => {
      return el.message;
    });
    status = 400;
    message = messegeErrorValidation;
  } else if (error.name === "SequelizeUniqueConstraintError") {
    let messageErrorUnique = error.errors.map((el) => {
      return el.message;
    });
    status = 400;
    message = messageErrorUnique;

    if (error.original.constraint === "Users_email_key") {
      status = 400;
      message = ["Email is already used"];
    }
  } else if (error.name === "MissingAccessToken") {
    status = 401;
    message = "Missing Access Token";
  } else if (error.name === "Unauthorized") {
    status = 401;
    message = "Unauthorized";
  } else if (error.name === "Authorized") {
    status = 401;
    message = "Unauthorized";
  } else if (error.name === "Forbidden") {
    status = 403;
    message = "Forbidden";
  } else if (error.name === "forbidden") {
    status = 403;
    message = "Forbidden";
  } else if (error.name === "EmailorPasswordNotFound") {
    status = 404;
    message = "Email or Password Not Found";
  } else if (error.name === "InvalidPassword") {
    status = 401;
    message = "Invalid Password";
  } else if (error.name === "DataNotFound") {
    status = 404;
    message = "Data Not Found";
  } else if (error.name === "EmailNotFound") {
    status = 404;
    message = "Email Not Found";
  } else if (error.name === "FieldNotFound") {
    status = 404;
    message = "Field Not Found";
  } else if (error.name === "ReferenceError") {
    status = 404;
    message = "Data Not Found";
  } else if (error.name === "DuplicateFavorite") {
    status = 400;
    message = "Favorite has been added";
  } else if (error.name === "alreadyBooking") {
    status = 400;
    message = "Already Booking";
  } else {
    status = 500;
    message = "Internal Server Error";
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
