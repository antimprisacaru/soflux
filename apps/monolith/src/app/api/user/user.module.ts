import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { UserRepositoryFactory } from './repository/user.repository';
import { ConfigModule } from '@nestjs/config';
import { CloudConfig } from '../../shared/config/cloud-config';
import { AuthModule } from '../../common/auth/auth.module';
import { IdentityProviderFactory } from '../../shared/identity-provider/identity-provider';

@Module({
    imports: [ConfigModule, AuthModule],
    providers: [CloudConfig, UserService, UserResolver, UserRepositoryFactory, IdentityProviderFactory]
})
export class UserModule {}
