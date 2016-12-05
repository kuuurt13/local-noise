import Redis from 'ioredis';

import redisConfig from '../configs/redis';

const redis = new Redis(redisConfig.port, redisConfig.ip);

async function get(key) {
  key = key.toLowerCase();

  let payload = await redis.get(key);
  payload = payload ? JSON.parse(payload) : null;

  return Promise.resolve(payload);
}

function set(key, value) {
  key = key.toLowerCase();

  if (value) {
    value = typeof(value) === 'object' ? JSON.stringify(value) : value;
    return redis.set(key, value);
  }
}

export default { get, set }
