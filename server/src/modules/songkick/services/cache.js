import redis from '../../../shared/redis';
import { secondsTillEndOfDay } from '../../../shared/dates';
import skConfig from '../../../configs/songkick';

const { redisKey } = skConfig;

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
    redis.set(key, JSON.stringify(value), 'EX', secondsTillEndOfDay());
  }
}

function generateKey({ location, date, page = 1, perPage = 50 }) {
  return [redisKey, location, date.start, date.end, page, perPage].join(':');
}
