import { execAsync } from './utils';

export default async function serveMonolith(platform: string): Promise<void> {
    process.env.PROVIDER = platform;

    switch (platform) {
        case 'aws':
            await execAsync('nx', ['serve', 'monolith'], '');
            break;
        case 'google':
            break;
        default:
            console.error(`ERROR: No implementation available for ${platform}.`);
            return;
    }
}
