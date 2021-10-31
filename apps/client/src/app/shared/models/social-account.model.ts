import { SocialAccountStatus } from './social-account-status.model';
import { SocialPlatform } from './social-platform.model';

export default class SocialAccount {
    id: string;
    username: string;
    status: SocialAccountStatus;
    key: string;
    platform: SocialPlatform;
}
