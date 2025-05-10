import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = "Internal Server Error";

  if (error instanceof MongooseError.ValidationError) {
    status = 400;
    message = "Validation error: " + error.message;
  } else if (error instanceof MongoServerError) {
    status = 400;
    message = "Database error: " + error.message;
  } else {
    switch (error.name) {
      case "EmailRequiredError":
        status = 400;
        message = "Please input your email";
        break;
      case "PasswordRequiredError":
        status = 400;
        message = "Please input your password";
        break;
      case "ProfileRequiredError":
        status = 400;
        message = "Please fill in your profile";
        break;
      case "Unauthorized":
        status = 401;
        message = "Invalid email or password";
        break;
      case "Unauthenticated":
        status = 401;
        message = "Invalid token";
        break;
      case "Forbidden":
        status = 403;
        message = "You don't have permission to access this resource";
        break;
      case "NotFound":
        status = 404;
        message = "Not Found";
        break;
      default:
        status = 500;
        message = "Unknown error occurred";
        break;
    }
  }

  res.status(status).json({ message });
};
