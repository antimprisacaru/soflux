import { execAsync } from './utils';

export default async function deploy(provider: string, stage: 'dev' | 'test' | 'prod'): Promise<void> {
    if (stage) {
      process.env.stage = stage || 'dev';
    }
    switch (provider) {
        case 'aws':
            await execAsync('terraform', ['init'], 'ops/aws');
            await execAsync('terraform', ['apply', '-auto-approve'], 'ops/aws');
            return;
        case 'google':
          await execAsync('terraform', ['init'], 'ops/aws');
          await execAsync('terraform', ['apply', '-auto-approve'], 'ops/aws');
            return;
        default:
            console.error(`ERROR: No implementation available for ${provider}.`);
    }
}
