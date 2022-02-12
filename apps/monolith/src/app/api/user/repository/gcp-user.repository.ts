import { Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import User from '../model/user.model';
import { ConfigService } from "@nestjs/config";

export class GcpUserRepository implements UserRepository {
    logger = Logger;

    constructor(private configService: ConfigService) {}

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
