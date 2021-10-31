import { SocialPlatform } from '../../../shared/models/social-platform.model';

export default class SocialAccount {
    id: string;
    username: string;
    key: string;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    posts: number;
    followers: number;
    picture: string;
    platform: SocialPlatform;
}
