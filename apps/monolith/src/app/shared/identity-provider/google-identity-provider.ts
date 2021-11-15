import { IdentityProvider } from './identity-provider';
import { CloudConfig } from '../config/cloud-config';

export class GoogleIdentityProvider implements IdentityProvider {
    constructor(private cloudConfig: CloudConfig) {}

    getUser(accessToken: string): Promise<string> {
        return Promise.resolve('');
    }

    login(email: string, password: string): Promise<string> {
        return Promise.resolve('');
    }

    removeAll(): Promise<void> {
        return Promise.resolve(undefined);
    }

    setPassword(id: string | number, password: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    signUp(username: string, password: string): Promise<void> {
        return Promise.resolve(undefined);
    }
}
