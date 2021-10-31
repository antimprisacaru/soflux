import { execAsync } from './utils';

export default async function serveMonolith(platform: string, sls = false): Promise<void> {
    switch (platform) {
        case 'aws':
            if (sls) {
                await execAsync('sls offline', ['start'], 'ops/aws');
            } else {
                await execAsync('nx', ['serve', 'monolith'], '');
            }
            break;
        case 'google':
            break;
        default:
            console.error(`ERROR: No implementation available for ${platform}.`);
            return;
    }
}
