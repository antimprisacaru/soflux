import { Module } from '@nestjs/common';

import { CoreModule } from '@soflux/core';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true,
            context: ({ req, res }) => ({ req, res }),
            debug: !!process.env.NX_CLI_SET
        }),
        CoreModule,
        ApiModule
    ]
})
export class AppModule {}
