import { execAsync } from './utils';

export default async function buildMonolith(): Promise<void> {
    await execAsync('nx', ['build', 'monolith', '--prod', '--webpack'], '');
    await execAsync('yarn', ['install'], 'dist/apps/monolith');
}
