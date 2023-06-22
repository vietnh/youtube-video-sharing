import { Response } from 'express';
import {
  AuthenticationController,
  ILoginRequest,
} from '../../controllers/authenticationController';
import User from '../../models/User';
import bcrypt from 'bcrypt';

process.env.JWT_TOKEN = 'test_jwt_secret';

const mockResponse = (): Partial<Response> => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
};

describe('AuthenticationController', () => {
  const authenticationController = new AuthenticationController();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return a token and user email for valid email and password', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    };
    const req = {
      body: { email: mockUser.email, password: 'password' },
    } as ILoginRequest;
    const res = mockResponse() as Response;

    User.findOne = jest.fn().mockResolvedValue(mockUser);

    await authenticationController.login(req, res);

    expect(res.status).not.toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: expect.any(String),
        user: { email: mockUser.email },
      })
    );
  });

  it('should return a 400 status with an error message for invalid password', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
    };
    const req = {
      body: { email: 'invalid@example.com', password: 'invalid' },
    } as ILoginRequest;
    const res = mockResponse() as Response;

    User.findOne = jest.fn().mockResolvedValue(mockUser);

    await authenticationController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid email or password.',
    });
  });

  it('should return a 400 status with an error message for invalid email', async () => {
    const req = {
      body: { email: 'invalid@example.com', password: 'password' },
    } as ILoginRequest;
    const res = mockResponse() as Response;

    User.findOne = jest.fn().mockResolvedValue(undefined);

    await authenticationController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid email or password.',
    });
  });
});
