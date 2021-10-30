import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { validationSchema } from './config/validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
            validationSchema
        })
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class CoreModule {}
