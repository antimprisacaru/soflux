import User from '../model/user.model';
import { AwsUserRepository } from './aws-user.repository';
import { GoogleUserRepository } from './google-user.repository';
import { ConfigService } from '@nestjs/config';

export interface UserRepository {
    findUser(id: string): Promise<User>;
    findUserByEmail(username: string): Promise<User>;
    saveUser(user: User);
    removeAll(): Promise<void>;
}

export const UserRepositoryFactory = {
    provide: 'UserRepository',
    useFactory: (configService: ConfigService) => {
        switch (configService.get<string>('cloud.provider')) {
            case 'aws':
                return new AwsUserRepository(configService);
            case 'google':
                return new GoogleUserRepository(configService);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [ConfigService]
};
