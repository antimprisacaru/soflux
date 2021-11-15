import { IdentityProvider } from './identity-provider';
import { CloudConfig } from '../config/cloud-config';
import { Logger } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export class AwsIdentityProvider implements IdentityProvider {
    private readonly logger = new Logger(AwsIdentityProvider.name);
    private cognitoIdentityProvider = new CognitoIdentityServiceProvider({
        region: this.config.get('AWS_REGION')
    });

    constructor(private config: CloudConfig) {}

    async getUser(accessToken: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .getUser({ AccessToken: accessToken })
            .promise()
            .then(value => value.Username);
    }

    async login(email: string, password: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .initiateAuth({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.config.get('AWS_CLIENT_ID'),
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })
            .promise()
            .then(result => result.AuthenticationResult.AccessToken);
    }

    async signUp(username: string, password: string): Promise<void> {
        await this.cognitoIdentityProvider.adminCreateUser({
            UserPoolId: this.config.get('AWS_USER_POOL_ID'),
            Username: `${username}`
        });
        await this.setPassword(username, password);
    }

    async setPassword(id: string | number, password: string): Promise<void> {
        await this.cognitoIdentityProvider.adminSetUserPassword({
            Username: `${id}`,
            Permanent: true,
            Password: password,
            UserPoolId: this.config.get('AWS_USER_POOL_ID')
        });
    }

    async removeAll(): Promise<void> {
        this.logger.log('Pula inca.', this);
    }
}
