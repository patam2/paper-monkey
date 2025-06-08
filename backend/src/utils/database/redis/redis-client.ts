import { createClient } from 'redis';
import { CookieData } from '../../../models/authmodels';
import { string } from 'zod';

export default class RedisClient {
    redisClient: any; 
    constructor() {
        this.redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`})
        this.redisClient.on('error', (err: string) => {
            console.log('Redis error:', err)
        })
        this.redisClient.connect()
    }

    async setValue(key: string, value: CookieData | string, expireSeconds?: number): Promise<void> {
        try {
            
            if (typeof value !== "string") {
                var serialized = JSON.stringify(value);
            }
            else {
                var serialized = value
            }
            
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

    async getObject<T>(key: string): Promise<T | null> {
        try {
            const val = await this.redisClient.get(key);
            if (!val) return null;
            return JSON.parse(val) as T;
        } catch (error) {
            console.error('Error getting object key:', key, error);
            throw error;
        }
    }

    async getString(key: string): Promise<string | null> {
        try {
            const val = await this.redisClient.get(key);
            if (!val) return null
            return val
        } catch (error) {
            console.error('Error getting string key:', key, error)
            throw error
        }
    }

}

