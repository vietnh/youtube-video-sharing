import User, { IUserProperties } from '../models/User';
import bcrypt from 'bcrypt';

const defaultUsers: IUserProperties[] = [
  {
    email: 'mickey@yopmail.com',
    password: 'mickey',
  },
  {
    email: 'minnie@yopmail.com',
    password: 'minnie',
  },
  {
    email: 'donald@yopmail.com',
    password: 'donald',
  },
  {
    email: 'daisy@yopmail.com',
    password: 'daisy',
  },
];

export async function createDefaultUsers(): Promise<void> {
  const userPromises = defaultUsers.map(async (user) => {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      user.password = await bcrypt.hash(user.password, 10);
      await User.create(user);
    }
  });

  await Promise.all(userPromises);
}