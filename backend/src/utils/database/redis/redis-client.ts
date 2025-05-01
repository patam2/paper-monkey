import { createClient } from 'redis';
import { CookieData } from '../../../models/authmodels';

export default class RedisClient {
    redisClient: any; 
    constructor() {
        this.redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`})
        this.redisClient.on('error', (err: string) => {
            console.log('Redis error:', err)
        })
        this.redisClient.connect()
    }

    async setValue(key: string, value: CookieData, expireSeconds?: number): Promise<void> {
        try {
            const serialized = JSON.stringify(value);
            if (expireSeconds) {
                this.redisClient.set(key, JSON.stringify(value))
            }
            else {
                this.redisClient.set(key, serialized, {EX: expireSeconds})
            }
        } catch (error) {
            console.error('Error with setting key: ', error)
            throw error
        }
    }

    async getValue(key: string): Promise<CookieData | null> {
        try {
            const val = await this.redisClient.get(key)
            if (!val) return null;    
            return JSON.parse(val) as CookieData
    
        } catch (error) {
            console.error('Error setting key', error)
            throw error
        }
    }
}

