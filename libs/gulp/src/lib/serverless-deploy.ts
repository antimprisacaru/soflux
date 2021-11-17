import { execAsync } from './utils';

export default async function serverlessDeploy(provider: string, stage: 'develop' | 'test' | 'prod', skipBuild = false): Promise<void> {
    if (!skipBuild) {
        await execAsync('gulp', ['build:monolith'], '.');
    }
    switch (provider) {
        case 'aws':
            await execAsync('serverless', ['deploy', '--stage', stage], 'ops/aws');
            return;
        case 'google':
            await execAsync('serverless', ['google', '--stage', stage], 'ops/aws');
            return;
        default:
            console.error(`ERROR: No implementation available for ${provider}.`);
    }
}
