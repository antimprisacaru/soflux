import { execAsync } from './utils';

export default async function serveClient(): Promise<void> {
    await execAsync('nx', ['serve'], 'client');
}
