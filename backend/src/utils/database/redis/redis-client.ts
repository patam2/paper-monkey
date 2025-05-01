import { createClient, RedisClientType } from 'redis';



class RedisClient {
    redisClient: RedisClientType; 
    constructor() {
        this.redisClient = createClient({ url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`})
        this.redisClient.connect()
    }

    async function setValue(key: string, value: string): Promise<void> {
        await this.
    }
}


//redisClient.on('error', (err) => console.log(err))
//redisClient.connect();

