import redis from '../../../shared/redis';

export default {
  get,
  set
};

async function get(key, track) {
  try {
    let { _id: id, ...tracks } = await redis.hget(key);
    return track ? tracks[track] : { id, tracks };
  } catch (error) {
    return Promise.resolve({});
  }
}

async function set(key, { id, ...tracks }) {
  let value = tracks;

  if (id) {
    value._id = id;
  }

  redis.hset(key, value);
}

