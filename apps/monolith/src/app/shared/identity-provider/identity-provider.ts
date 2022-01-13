import { GoogleIdentityProvider } from './google-identity-provider';
import { AwsIdentityProvider } from './aws-identity-provider';
import { ConfigService } from '@nestjs/config';

export interface IdentityProvider {
    getUser(accessToken: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    signUp(username: string, password: string): Promise<void>;
    setPassword(id: string | number, password: string): Promise<void>;
    removeAll(): Promise<void>;
}

export const IdentityProviderFactory = {
    provide: 'IdentityProvider',
    useFactory: (configService: ConfigService) => {
        switch (configService.get<string>('cloud.provider')) {
            case 'aws':
                return new AwsIdentityProvider(configService);
            case 'google':
                return new GoogleIdentityProvider(configService);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [ConfigService]
};
