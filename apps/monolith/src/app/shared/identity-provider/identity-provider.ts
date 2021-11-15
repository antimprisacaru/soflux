import { CloudConfig } from '../config/cloud-config';
import { GoogleIdentityProvider } from './google-identity-provider';
import { AwsIdentityProvider } from './aws-identity-provider';

export interface IdentityProvider {
    getUser(accessToken: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    signUp(username: string, password: string): Promise<void>;
    setPassword(id: string | number, password: string): Promise<void>;
    removeAll(): Promise<void>;
}

export const IdentityProviderFactory = {
    provide: 'IdentityProvider',
    useFactory: (config: CloudConfig) => {
        switch (config.provider()) {
            case 'aws':
                return new AwsIdentityProvider(config);
            case 'google':
                return new GoogleIdentityProvider(config);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [CloudConfig]
};
