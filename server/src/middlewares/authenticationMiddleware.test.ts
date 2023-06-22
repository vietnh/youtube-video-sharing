import request from 'supertest';
import app from '../index';

let originalNodeEnv: string | undefined;

beforeAll(() => {
  originalNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
});

afterAll(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

describe('AuthenticationMiddleware', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return 401 error if no token in header', async () => {
    const response = await request(app).post('/videos');

    expect(response.body).toMatchObject({
      message: 'No token or token is in invalid format, authorization denied',
    });
  });

  it('should return 401 error if token is invalid', async () => {
    const invalidToken = 'Bearer invalid token';

    const response = await request(app)
      .post('/videos')
      .set('Authorization', invalidToken);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      message: 'Token is not valid',
    });
  });
});
