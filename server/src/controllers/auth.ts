import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUserProperties } from '../models/User';

interface ILoginRequest extends Request {
  body: IUserProperties;
}

export async function login(req: ILoginRequest, res: Response): Promise<Response> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN as string, { expiresIn: '1h' });
    console.log("Loged in successfully. Token: ", token);

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}