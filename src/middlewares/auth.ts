import { NextFunction, Request, Response } from "express";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Unauthorized");
  } catch (error) {}
};
