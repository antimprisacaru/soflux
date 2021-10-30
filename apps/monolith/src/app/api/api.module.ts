import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocialAccountModule } from './social-account/social-account.module';

@Module({
    imports: [UserModule, SocialAccountModule]
})
export class ApiModule {}
