import * as dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  global: boolean;
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}

export const config: IConfig = {
  global: true,
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: { expiresIn: '90d' },
};
