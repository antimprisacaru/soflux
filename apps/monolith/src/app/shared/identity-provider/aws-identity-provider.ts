import { IdentityProvider } from './identity-provider';
import { Logger } from '@nestjs/common';
import { CognitoIdentityServiceProvider, SecretsManager } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export class AwsIdentityProvider implements IdentityProvider {
    private clientId: string;
    private userPoolId: string;
    private readonly logger = new Logger(AwsIdentityProvider.name);
    private cognitoIdentityProvider = new CognitoIdentityServiceProvider({
        region: 'eu-central-1'
    });

    constructor(private configService: ConfigService) {
        this.cognitoIdentityProvider.updateIdentityProvider();
        this.initSecrets(configService.get<string>('env'));
    }

    async getUser(accessToken: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .getUser({ AccessToken: accessToken })
            .promise()
            .then(value => value.Username)
            .catch(err => {
                throw new Error(err);
            });
    }

    async login(email: string, password: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .initiateAuth({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.clientId,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })
            .promise()
            .then(result => result.AuthenticationResult.AccessToken)
            .catch(err => {
                throw new Error(err);
            });
    }

    async signUp(username: string, password: string): Promise<void> {
        await this.cognitoIdentityProvider
            .adminCreateUser({
                UserPoolId: this.userPoolId,
                Username: `${username}`
            })
            .promise()
            .catch(err => {
                throw new Error(err);
            });
        await this.setPassword(username, password);
    }

    async setPassword(id: string | number, password: string): Promise<void> {
        await this.cognitoIdentityProvider
            .adminSetUserPassword({
                Username: `${id}`,
                Permanent: true,
                Password: password,
                UserPoolId: this.userPoolId
            })
            .promise()
            .catch(err => {
                throw new Error(err);
            });
    }

    async removeAll(): Promise<void> {
        await this.cognitoIdentityProvider
            .listUsers({ UserPoolId: this.userPoolId })
            .promise()
            .then(result => {
                return result.Users.forEach(user =>
                    this.cognitoIdentityProvider
                        .adminDeleteUser({
                            Username: user.Username,
                            UserPoolId: this.userPoolId
                        })
                        .promise()
                        .catch(e => {
                            throw new Error(e);
                        })
                );
            });
    }

    private async initSecrets(env: string): Promise<void> {
        const secretsManager = new SecretsManager({
            region: 'eu-central-1'
        });
        this.clientId = await secretsManager
            .getSecretValue({ SecretId: `cognito-client-id-${env}` })
            .promise()
            .then(data => data.SecretString);
        this.userPoolId = await secretsManager
            .getSecretValue({ SecretId: `cognito-user-pool-id-${env}` })
            .promise()
            .then(data => data.SecretString);
    }
}
