import { SecretsManagerService } from './secrets-manager.service';
import { InstagramSecret } from '../models/instagram-secret.model';
import { SecretsManager } from 'aws-sdk';

export class AwsSecretsManagerService implements SecretsManagerService {
    manager: SecretsManager;

    constructor() {
        this.manager = new SecretsManager({
            region: 'eu-central-1'
        });
    }

    async getInstagramSecret(): Promise<InstagramSecret> {
        return await this.getSecret<InstagramSecret>('instagram-api-secrets');
    }

    async getSecret<T extends string | object>(key: string): Promise<T> {
        try {
            const data = await this.manager.getSecretValue({ SecretId: key }).promise();
            if (!data?.SecretString) {
                return null;
            }
            const secret = data.SecretString;

            if (AwsSecretsManagerService.isJson(secret)) {
              return JSON.parse(secret);
            } else {
              return secret as T;
            }
        } catch (err) {
            if (err.code === 'ResourceNotFoundException') {
                throw new Error(`The requested secret ${key} was not found`);
            } else if (err.code === 'InvalidRequestException') {
                throw new Error(`The request was invalid due to: ${err.message}`);
            } else if (err.code === 'InvalidParameterException') {
                throw new Error(`The request had invalid params: ${err.message}`);
            }
        }
    }

    private static isJson(str): boolean {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}
