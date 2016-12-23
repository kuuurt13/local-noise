import Redis from 'ioredis';

import redisConfig from '../configs/redis';

const client = new Redis(redisConfig.port, redisConfig.ip);

export default {
  get,
  set,
  hget,
  hset
};

async function get(key) {
  key = key.toLowerCase();
  return client.get(key);
}

function set(key, value, ...params) {
  if (key && value) {
    key = key.toLowerCase();
    return client.set(key, value, ...params);
  }

  return false;
}


async function hget(key, prop) {
  return new Promise((resolve, reject) => {
    key = key.toLowerCase();

    client.hgetall(key, (err, res) => {
      resolve(prop ? res[prop] : res);
    });
  });
}

function hset(key, value) {
  key = key.toLowerCase();

  if (value) {
    return client.hmset(key, value);
  }

  return false;
}
