import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    // Replace 'your-jwt-secret' with your own secret
    const decoded = jwt.verify(token, process.env.JWT_TOKEN as string) as { user: { id: string } };
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}