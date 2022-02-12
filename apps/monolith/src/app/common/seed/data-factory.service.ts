import { getSeed, SeedType } from './seed.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IdentityProvider } from '../../shared/identity-provider/identity-provider';
import { UserRepository } from '../../api/user/repository/user.repository';

@Injectable()
export class DataFactoryService {
    private readonly logger = new Logger(DataFactoryService.name);

    constructor(
        @Inject('IdentityProvider') private readonly identityProvider: IdentityProvider,
        @Inject('UserRepository') private userRepository: UserRepository
    ) {}

    async seed(type: SeedType = SeedType.DEFAULT): Promise<void> {
        this.logger.log(`Seeding... ${SeedType[type]}`);

        // Clearing users from Identity Provider
        this.logger.log(`Removing all users from the identity provider...`);
        await this.identityProvider.removeAll();

        // Clearing DB
        this.logger.log(`Removing all data from the DB...`);
        await this.userRepository.removeAll();

        // Seeding
        this.logger.log(`Seeding in progress...`);
        getSeed(type).forEach(seed => {
            this.identityProvider.signUp(seed.id, 'example');
            this.userRepository.saveUser(seed);
        });

        // Seeding successful
        this.logger.log(`Seeding successful! You may now proceed to use the app.`);
    }
}
