import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    ENV: Joi.string().valid('dev', 'prod', 'test').required(),
    MONOLITH_PORT: Joi.number().default(3000),
    NAMESPACE_UUID: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] }),
    PROVIDER: Joi.string().valid('aws', 'google').required(),
    JWT_SECRET: Joi.string().guid({ version: ['uuidv4', 'uuidv5'] })
});
