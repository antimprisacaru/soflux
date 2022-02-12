import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SocialAccountService } from './services/social-account.service';
import { SocialAccountFactory } from './repository/social-account.repository';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { SocialAccountResolver } from './resolvers/social-account.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
    imports: [HttpModule, ConfigModule, UserModule, SharedModule],
    providers: [SocialAccountResolver, SocialAccountService, SocialAccountFactory]
})
export class SocialAccountModule {}
