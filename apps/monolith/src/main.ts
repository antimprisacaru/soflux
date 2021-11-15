import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ServerlessNestjsApplicationFactory } from 'serverless-lambda-nestjs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import cookieParser from 'cookie-parser';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { Logger } from '@nestjs/common';

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
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    });
    app.use(cookieParser());
    const port = process.env.monolith_port || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port);
        Logger.log(`Running in ${config.get('environment')} mode`);
    });
}

// Run Nestjs application locally
if (process.env.NX_CLI_SET) {
    bootstrap();
}

// TODO: move this to lambda.handler.ts once multiple entrypoint config for webpack is done
export const handler: APIGatewayProxyHandler = async (event, context) => {
    const app = new ServerlessNestjsApplicationFactory<AppModule>(AppModule, {
        cors: {
            origin: '*',
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
        }
    });
    return await app.run(event, context);
};
