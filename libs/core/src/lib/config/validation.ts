import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    MONOLITH_PORT: Joi.number().default(3000),
    NAMESPACE_UUID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    CLOUD: Joi.object({ provider: Joi.string().valid('aws', 'google').required(), aws: Joi.object() }),
    JWT_SECRET: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] })
});
