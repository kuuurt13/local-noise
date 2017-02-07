import redis from '../../../shared/redis';
import { secondsTillEndOfDay } from '../../../shared/dates';
import { redisKey } from '../../../configs/setlistfm';

export default {
  get,
  set
};

async function get(mid) {
  try {
    let data = await redis.get(redisKey + mid);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return Promise.resolve(null);
  }
}


function set(mid, value) {
  if (mid && value && Object.keys(value).length) {
    redis.set(redisKey + mid, JSON.stringify(value), 'EX', secondsTillEndOfDay());
  }
  return value;
}
