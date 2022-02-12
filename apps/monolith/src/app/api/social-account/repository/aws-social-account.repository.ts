import { SocialAccountRepository } from './social-account.repository';
import SocialAccount from '../model/social-account.model';
import { ConfigService } from '@nestjs/config';

export class AwsSocialAccountRepository implements SocialAccountRepository {
  constructor(private configService: ConfigService) {}

  fetchSocialAccounts(): Promise<SocialAccount[]> {
    return undefined;
  }

  saveSocialAccount(userId: string, socialAccount: SocialAccount): Promise<void> {
    return Promise.resolve(undefined);
  }
}
