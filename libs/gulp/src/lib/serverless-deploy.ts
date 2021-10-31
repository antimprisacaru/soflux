import { execAsync } from './utils';

export default async function serverlessDeploy(provider: string, skipBuild = false): Promise<void> {
    process.env.ENVIRONMENT_CONFIG = 'cloud';

    if (!skipBuild) {
        await execAsync('npm', ['run', 'build'], 'serverless');
    }
    switch (provider) {
        case 'aws':
            await execAsync('serverless', ['deploy'], 'ops/aws');
            return;
        case 'google':
          await execAsync('serverless', ['google'], 'ops/aws');
            return;
        default:
            console.error(`ERROR: No implementation available for ${provider}.`);
    }
}
