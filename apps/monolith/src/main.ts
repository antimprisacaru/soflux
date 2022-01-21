import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { Logger } from '@nestjs/common';

let server: Handler;

async function bootstrap(): Promise<any> {
    return await (
        await NestFactory.create(AppModule, {
            logger: WinstonModule.createLogger({
                transports: [
                    new winston.transports.Console({
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            winston.format.ms(),
                            nestWinstonModuleUtilities.format.nestLike('Soflux Monolith', { prettyPrint: true })
                        )
                    })
                ]
            }),
            cors: {
                credentials: true,
                origin: '*',
                allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        })
    ).init();
}

async function runLocally(): Promise<void> {
    const app = await bootstrap();
    const config = app.get(ConfigService);
    const port = config.get('monolith_port') || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port);
        Logger.log(`Running in ${config.get('env')} mode`);
    });
}

// Run Nestjs application locally
if (process.env.NX_CLI_SET) {
    runLocally();
}

export const handler: Handler = async (event: unknown, context: Context, callback: Callback) => {
    server = server ?? serverlessExpress({ app: (await bootstrap()).getHttpAdapter().getInstance() });
    return server(event, context, callback);
};
