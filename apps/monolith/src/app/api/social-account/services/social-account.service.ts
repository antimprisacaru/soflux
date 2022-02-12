import { Inject, Injectable, Logger } from '@nestjs/common';
import SocialAccountDto from '../dto/social-account.dto';
import { SocialAccountRepository } from '../repository/social-account.repository';
import { SocialPlatform } from '../../../shared/models/social-platform.model';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/services/user.service';
import { InstagramHelperService } from '../../../shared/services/instagram-helper.service';
import { SecretsManagerService } from '../../../shared/secrets-manager/secrets-manager.service';

@Injectable()
export class SocialAccountService {
    private readonly logger = new Logger(SocialAccountService.name);
    constructor(
        @Inject('SocialAccountRepository') private readonly socialAccountRepository: SocialAccountRepository,
        @Inject('SecretsManagerService') private readonly secretsManager: SecretsManagerService,
        private readonly instagramHelperService: InstagramHelperService,
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {}

    async exchangeAndFetch(accessToken: string, code: string, platform: SocialPlatform, redirect: string): Promise<void> {
        const userId = await this.userService.decodeUserToken(accessToken);

        switch (platform) {
            case SocialPlatform.INSTAGRAM: {
                this.logger.log(`Exchanging Authorization token for Access Token for ${code} on ${platform}`);
                const apiExchangeResult = await this.instagramHelperService.exchangeInstagramCode(code, await this.secretsManager.getInstagramSecret(), redirect);

                if (!apiExchangeResult) {
                    throw new Error('Token exchange not successful!');
                }

                const account = await this.instagramHelperService.fetchInstagramUser(apiExchangeResult.accessToken);

                if (!account) {
                    throw new Error(`Fetching account with Access Token ${accessToken} has failed.`);
                }

                this.logger.log(`Found user ${account.handle} and saving it.`);
                await this.socialAccountRepository.saveSocialAccount(userId, account);
                break;
            }
            case SocialPlatform.FACEBOOK:
            case SocialPlatform.TWITCH:
            case SocialPlatform.YOUTUBE:
            default:
                throw new Error(`Error: Platform ${platform} is not currently supported.`);
        }
    }

    async fetchAccounts(accessToken: string): Promise<SocialAccountDto[]> {
        const userId = await this.userService.decodeUserToken(accessToken);

        const socialAccounts = await this.socialAccountRepository.fetchSocialAccounts(userId);

        return socialAccounts.map(account => ({
            id: account.id,
            accountId: userId,
            followers: account.followers,
            following: account.following,
            handle: account.handle,
            name: account.name,
            platform: account.platform,
            posts: account.posts,
            profilePicture: account.profilePicture,
            isFake: account.isFake
        }));
    }
}
