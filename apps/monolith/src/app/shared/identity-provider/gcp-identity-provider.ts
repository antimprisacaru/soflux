import { IdentityProvider } from './identity-provider';
import { ConfigService } from '@nestjs/config';

export class GcpIdentityProvider implements IdentityProvider {
    constructor(private configService: ConfigService) {}

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
