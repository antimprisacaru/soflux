import { Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import User from '../model/user.model';
import { CloudConfig } from '../../../shared/config/cloud-config';

export class GoogleUserRepository implements UserRepository {
    logger = Logger;

    constructor(private config: CloudConfig) {}

    findUser(id: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    findUserByEmail(username: string): Promise<User> {
        return Promise.resolve(undefined);
    }

    removeAll(): Promise<void> {
        return Promise.resolve(undefined);
    }

    saveUser(user: User) {
        this.logger.log('Pula inca.');
    }
}
