import User from '../model/user.model';
import { CloudConfig } from '../../../shared/config/cloud-config';
import { AwsUserRepository } from './aws-user.repository';
import { GoogleUserRepository } from './google-user.repository';

export interface UserRepository {
    findUser(id: string): Promise<User>;
    findUserByEmail(username: string): Promise<User>;
    saveUser(user: User);
    removeAll(): Promise<void>;
}

export const UserRepositoryFactory = {
    provide: 'UserRepository',
    useFactory: (config: CloudConfig) => {
        switch (config.provider()) {
            case 'aws':
                return new AwsUserRepository(config);
            case 'google':
                return new GoogleUserRepository(config);
            default:
                throw new Error(`No repository found corresponding to input given.`);
        }
    },
    inject: [CloudConfig]
};
