import { Module } from '@nestjs/common';

import { CoreModule } from '@soflux/core';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            sortSchema: true
        }),
        CoreModule,
        ApiModule
    ]
})
export class AppModule {}
