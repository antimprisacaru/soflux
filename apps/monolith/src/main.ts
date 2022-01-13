import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ServerlessNestjsApplicationFactory } from 'serverless-lambda-nestjs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import cookieParser from 'cookie-parser';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { Logger } from '@nestjs/common';

// eslint-disable-next-line
var server;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
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
        })
    });
    const config = app.get(ConfigService);
    app.enableCors({
        credentials: true,
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    });
    app.use(cookieParser());
    const port = config.get<number>('monolith_port') || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port);
        Logger.log(`Running in ${config.get<string>('env')} mode`);
    });
}

// Run Nestjs application locally
if (process.env.NX_CLI_SET) {
    bootstrap();
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
    if (!server) {
        server = new ServerlessNestjsApplicationFactory<AppModule>(AppModule, {
            cors: {
                origin: '*',
                credentials: true,
                allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
            }
        });
    }
    return await server.run(event, context);
};
