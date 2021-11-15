import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    MONOLITH_PORT: Joi.number().default(3000),
    NAMESPACE_UUID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    CLOUD_PROVIDER: Joi.string().valid('aws', 'google').required(),
    JWT_SECRET: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] })
});
