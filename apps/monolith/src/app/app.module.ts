import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@soflux/core';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true
        }),
        CoreModule,
        ApiModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
