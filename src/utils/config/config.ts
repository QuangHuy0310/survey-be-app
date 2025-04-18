import * as dotenv from 'dotenv';
dotenv.config();

export const configs = {
    port: process.env.APP_PORT,

    jwt: process.env.SECRET_JWT,

    googleClientId : process.env.GOOGLE_CLIENT_ID,

    googleClientSecret: process.env.GOOGLE_SECRET_KEY,

    googleCallBackURL: process.env.GOOGLE_CALLBACK_URL,

    redis: process.env.REDIS_URL,

    redis_ttl : process.env.REDIS_TTL
}
