import { execAsync } from './utils';

export default async function buildClient(): Promise<void> {
  await execAsync('nx', ['build', 'client'], '');
}
