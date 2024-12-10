import { NextFunction, Request, Response } from "express";
import { MongoServerError } from "mongodb";
import { Error } from "mongoose";

export const errorHandler = (
  error: Error & Error.ValidationError & MongoServerError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = 500;
  let message = "Internal Server Error";

  switch (error.name as string) {
    case "ValidationError":
      status = 400;
      message = error.message;
      break;
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
  }

  res.status(status).json({ message });
};
