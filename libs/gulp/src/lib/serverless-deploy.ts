import { execAsync } from './utils';

export default async function serverlessDeploy(provider: string, stage: 'dev' | 'test' | 'prod', skipBuild = false): Promise<void> {
    process.env.STAGE = stage;

    if (!skipBuild) {
        await execAsync('gulp', ['build:monolith'], '.');
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
