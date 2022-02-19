import { IdentityProvider } from './identity-provider';
import { Logger } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export class AwsIdentityProvider implements IdentityProvider {
    private readonly clientId: string;
    private readonly userPoolId: string;
    private readonly logger = new Logger(AwsIdentityProvider.name);
    private cognitoIdentityProvider = new CognitoIdentityServiceProvider({
        region: 'eu-central-1'
    });

    constructor(private configService: ConfigService) {
        this.cognitoIdentityProvider.updateIdentityProvider();
        this.clientId = this.configService.get<string>('cloud.aws.cognitoClientId');
        this.userPoolId = this.configService.get<string>('cloud.aws.cognitoUserPoolId');
    }

    async getUser(accessToken: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .getUser({ AccessToken: accessToken })
            .promise()
            .then(value => value.Username)
            .catch(err => {
                this.logger.error(err);
                throw new Error('Whoops! An error has occurred!');
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
                this.logger.error(err);
                throw new Error('Whoops! An error has occurred!');
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
                this.logger.error(err);
                throw new Error('Whoops! An error has occurred!');
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
                this.logger.error(err);
                throw new Error('Whoops! An error has occurred!');
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
                            this.logger.error(e);
                            throw new Error(e);
                        })
                );
            });
    }
}
