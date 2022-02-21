import { InstagramSecret } from '../models/instagram-secret.model';
import { ConfigService } from '@nestjs/config';
import { AwsSecretsManagerService } from './aws-secrets-manager.service';
import { GcpSecretsManagerService } from './gcp-secrets.manager.service';

export interface SecretsManagerService {
    getInstagramSecret(): Promise<InstagramSecret>;
    getSecret<T extends string | object>(key: string): Promise<T>;
}

export const SecretsManagerFactory = {
    provide: 'SecretsManagerService',
    useFactory: (configService: ConfigService) => {
        switch (configService.get<string>('provider')) {
            case 'aws':
                return new AwsSecretsManagerService();
            case 'gcp':
                return new GcpSecretsManagerService();
            default:
                throw new Error(`No secrets manager found corresponding to input given.`);
        }
    },
    inject: [ConfigService]
};

