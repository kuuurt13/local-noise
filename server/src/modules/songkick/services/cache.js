import redis from '../../../shared/redis';
import { redisKey } from '../../../configs/songkick';

export default {
  get,
  set
};

async function get(params) {
  try {
    const key = generateKey(params);

    let data = await redis.get(key);
    return data ? JSON.parse(data) : false;
  } catch (error) {
    return Promise.resolve(false);
  }
}

async function set(params, value) {
  let key = generateKey(params);

  if (key && value) {
    redis.set(key, JSON.stringify(value));
  }
}

function generateKey({ location, date, page = 1 }) {
  return [redisKey, location, date, page].join(':');
}
