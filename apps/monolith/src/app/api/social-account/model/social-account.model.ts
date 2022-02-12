import { SocialPlatform } from '../../../shared/models/social-platform.model';

export default class SocialAccount {
    id: string;
    handle: string;
    name: string;
    posts: number;
    followers: number;
    following: number;
    profilePicture: string;
    platform: SocialPlatform;
    authToken?: string;
    refreshToken?: string;
    refreshEndpoint?: string;
    tokenExpiresAt?: Date;
    isFake: boolean;
}
