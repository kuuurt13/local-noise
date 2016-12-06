import Redis from 'ioredis';

import redisConfig from '../configs/redis';

const redis = new Redis(redisConfig.port, redisConfig.ip);

async function get(key, prop) {
  return new Promise((resolve, reject) => {
    key = key.toLowerCase();

    redis.hgetall(key, (err, res) => {
      resolve(prop ? res[prop] : res);
    });
  });
}

function set(key, value) {
  key = key.toLowerCase();

  if (value) {
    return redis.hmset(key, value);
  }

  return false;
}

export default { get, set }
