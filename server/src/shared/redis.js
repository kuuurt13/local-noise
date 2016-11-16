import Redis from 'ioredis';

import redisConfig from '../configs/redis';

const redis = new Redis(redisConfig.port, redisConfig.ip);

function get(key) {
  return redis.get(key);
}

function set(key, value) {
  return redis.set(key, value);
}

export default { get, set }
