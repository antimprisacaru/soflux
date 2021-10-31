import { SocialPlatform } from './social-platform.model';

export default class Marketer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    posts: number;
    followers: number;
    picture: string;
    platform: SocialPlatform;
}
