import { SecretsManagerService } from './secrets-manager.service';
import { InstagramSecret } from '../models/instagram-secret.model';

export class GcpSecretsManagerService implements SecretsManagerService {
  getInstagramSecret(): Promise<InstagramSecret> {
    return undefined;
  }

  getSecret<T extends string | object>(key: string): Promise<T> {
    return Promise.resolve(undefined);
  }
}
