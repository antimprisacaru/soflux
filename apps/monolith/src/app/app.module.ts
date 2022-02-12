import { Module } from '@nestjs/common';

import { CoreModule } from '@soflux/core';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { HttpModule } from '@nestjs/axios';
import { ConsoleModule } from './common/console/console.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true,
            context: ({ req, res }) => ({ req, res }),
            debug: !!process.env.NX_CLI_SET
        }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        }),
        ConsoleModule,
        CoreModule,
        ApiModule
    ]
})
export class AppModule {}
