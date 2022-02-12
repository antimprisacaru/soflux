import { ConfigService } from '@nestjs/config';
import SocialAccount from '../model/social-account.model';
import { GcpSocialAccountRepository } from './gcp-social-account.repository';
import { AwsSocialAccountRepository } from './aws-social-account.repository';
import { SocialPlatform } from '../../../shared/models/social-platform.model';

export interface SocialAccountRepository {
    fetchSocialAccounts(userId: string, platform?: SocialPlatform): Promise<SocialAccount[]>;
    saveSocialAccount(userId: string, socialAccount: SocialAccount): Promise<void>;
}

export const SocialAccountFactory = {
    provide: 'SocialAccountRepository',
    useFactory: (configService: ConfigService) => {
        switch (configService.get<string>('cloud.provider')) {
            case 'aws':
                return new AwsSocialAccountRepository(configService);
            case 'gcp':
                return new GcpSocialAccountRepository(configService);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [ConfigService]
};
