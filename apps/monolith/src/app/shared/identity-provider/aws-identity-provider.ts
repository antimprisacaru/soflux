import { IdentityProvider } from './identity-provider';
import { Logger } from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export class AwsIdentityProvider implements IdentityProvider {
    private readonly logger = new Logger(AwsIdentityProvider.name);
    private cognitoIdentityProvider = new CognitoIdentityServiceProvider({
        region: this.configService.get<string>('aws.region')
    });

    constructor(private configService: ConfigService) {}

    async getUser(accessToken: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .getUser({ AccessToken: accessToken })
            .promise()
            .then(value => value.Username)
            .catch(err => {
                this.logger.log(err, this);
                throw new Error('Whoops! An error has occurred!');
            });
    }

    async login(email: string, password: string): Promise<string> {
        return await this.cognitoIdentityProvider
            .initiateAuth({
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: this.configService.get<string>('aws.clientId'),
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })
            .promise()
            .then(result => result.AuthenticationResult.AccessToken)
            .catch(err => {
                this.logger.log(err, this);
                throw new Error('Whoops! An error has occurred!');
            });
    }

    async signUp(username: string, password: string): Promise<void> {
        await this.cognitoIdentityProvider
            .adminCreateUser({
                UserPoolId: this.configService.get<string>('aws.userPoolId'),
                Username: `${username}`
            })
            .promise()
            .catch(err => {
                this.logger.log(err, this);
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
                UserPoolId: this.configService.get<string>('aws.userPoolId')
            })
            .promise()
            .catch(err => {
                this.logger.log(err, this);
                throw new Error('Whoops! An error has occurred!');
            });
    }

    async removeAll(): Promise<void> {
        this.logger.log('Pula inca.', this);
    }
}
