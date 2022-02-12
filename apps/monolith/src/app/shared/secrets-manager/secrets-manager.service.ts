import { InstagramSecret } from '../models/instagram-secret.model';
import { ConfigService } from '@nestjs/config';
import { AwsSecretsManagerService } from './aws-secrets-manager.service';
import { GcpSecretsManagerService } from './gcp-secrets.manager.service';

export interface SecretsManagerService {
    getInstagramSecret(): Promise<InstagramSecret>;
}

export const SecretsManagerFactory = {
    provide: 'SecretsManagerService',
    useFactory: (configService: ConfigService) => {
        switch (configService.get<string>('cloud.provider')) {
            case 'aws':
                return new AwsSecretsManagerService(configService);
            case 'gcp':
                return new GcpSecretsManagerService(configService);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [ConfigService]
};

