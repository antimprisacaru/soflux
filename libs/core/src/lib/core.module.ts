import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { configValidationSchema } from './config/validation';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
            validationSchema: configValidationSchema
        })
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class CoreModule {}
