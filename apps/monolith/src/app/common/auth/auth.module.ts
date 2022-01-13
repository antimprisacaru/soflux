import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SharedModule } from '../../shared/shared.module';
import { IdentityProviderFactory } from '../../shared/identity-provider/identity-provider';

@Module({
    imports: [
        SharedModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt_secret')
            }),
            inject: [ConfigService]
        })
    ],
    providers: [IdentityProviderFactory, JwtStrategy, GqlAuthGuard],
    exports: [JwtModule, JwtStrategy, PassportModule]
})
export class AuthModule {}
