import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ServerlessNestjsApplicationFactory } from 'serverless-lambda-nestjs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors({
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    });
    app.use(cookieParser());
    const port = process.env.monolith_port || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        Logger.log(`Running in ${config.get('environment')} mode`);
    });
}

// Run Nestjs application locally
if (process.env.NX_CLI_SET) {
  bootstrap();
}

// TODO: move this to lambda.handler.ts once multiple entrypoint config for webpack is done
export const handler: APIGatewayProxyHandler = async (event, context) => {
  const app = new ServerlessNestjsApplicationFactory<AppModule>(
    AppModule,
    {
      cors: {
        origin: '*',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      },
    }
  );
  return await app.run(event, context);
};


