import Redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL

export const redis = new Redis(REDIS_URL)
