import { SecretsManagerService } from './secrets-manager.service';
import { InstagramSecret } from '../models/instagram-secret.model';
import { ConfigService } from '@nestjs/config';

export class GcpSecretsManagerService implements SecretsManagerService {
  constructor(private readonly configService: ConfigService) {}

  getInstagramSecret(): Promise<InstagramSecret> {
    return undefined;
  }
}
