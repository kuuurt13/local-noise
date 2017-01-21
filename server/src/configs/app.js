import dotenv from 'dotenv';

dotenv.config();

export default {
  apiUrl: '/api',
  port: process.env.APP_PORT,
  appIp: process.env.APP_IP,
  queueIp: process.env.QUEUE_IP,
  queuePort: process.env.QUEUE_PORT
};
