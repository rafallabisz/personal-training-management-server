import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(err: HttpException, req: Request, res: Response, next: NextFunction) {
  const status = err.status || 500;
  const message = err.message || "An error occurred";
  res.status(status).json({
    message,
    status
  });
}

export default errorMiddleware;
