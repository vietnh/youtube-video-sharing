import { NextFunction, Request, Response } from 'express';

export async function errorHandlerMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("Unexpected exception: ", error);
  res.status(500).json({ message: 'Something went wrong' });
}
