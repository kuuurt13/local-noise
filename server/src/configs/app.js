import dotenv from 'dotenv';

dotenv.config();

export default {
  apiUrl: '/api',
  port: process.env.APP_PORT
};
