import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }

  throw new Error("REDIS_URL is not defined");
};
const redis = new Redis(getRedisUrl());
// const redis = {
//   get(cartId: number) {
//     return undefined;
//   },
//   setEx() {
//     return undefined;
//   },
// };
export default redis;
export const REDIS_DEFAULT_EX = 3600;
