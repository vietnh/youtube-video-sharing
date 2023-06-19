import User, { IUserProperties } from '../models/User';
import bcrypt from 'bcrypt';

const defaultUsers: IUserProperties[] = [
  {
    email: 'user1@yopmail.com',
    password: 'user1',
  },
  {
    email: 'user2@yopmail.com',
    password: 'user2',
  },
  {
    email: 'user3@yopmail.com',
    password: 'user3',
  },
];

export async function createDefaultUsers(): Promise<void> {
  defaultUsers.forEach(async user => {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      user.password = await bcrypt.hash(user.password, 10);
      await User.create(user);
    }
  });
}