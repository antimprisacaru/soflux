import { execAsync } from './utils';

export default async function buildMonolith(): Promise<void> {
  await execAsync('nx', ['build', 'monolith'], '');
}
