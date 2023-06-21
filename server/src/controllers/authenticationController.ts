import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUserProperties } from '../models/User';
import { injectable } from 'inversify';

interface ILoginRequest extends Request {
  body: IUserProperties;
}

export interface IAuthenticationController {
  login(req: ILoginRequest, res: Response): Promise<Response>;
}

@injectable()
export class AuthenticationController implements IAuthenticationController {
  public login = async (
    req: ILoginRequest,
    res: Response
  ): Promise<Response> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN as string, {
      expiresIn: '1h',
    });
    console.log('Logged in successfully. Token: ', token);

    return res.json({ token, user: { email: user.email } });
  };
}
