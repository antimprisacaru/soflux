import { Module } from '@nestjs/common';

import { CoreModule } from '@soflux/core';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true,
            context: ({ req }) => ({ req }),
            debug: !!process.env.NX_CLI_SET,
            playground: !!process.env.NX_CLI_SET
        }),
        CoreModule,
        SharedModule,
        ApiModule
    ]
})
export class AppModule {}
