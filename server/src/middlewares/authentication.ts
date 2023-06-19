import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface IAuthRequest extends Request {
  user?: IUser;
}

export async function validateToken(req: IAuthRequest, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token or token is in invalid format, authorization denied' });
  }
  try {
    const extractedToken = token.slice(7, token.length);
    const decoded = jwt.verify(extractedToken, process.env.JWT_TOKEN as string) as { user: { id: string } };
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}