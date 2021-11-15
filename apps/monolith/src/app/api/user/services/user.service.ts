import { Inject, Injectable, Logger } from '@nestjs/common';
import uuid from 'uuid';
import { UserDto } from '../dto/user.dto';
import { IdentityProvider } from '../../../shared/identity-provider/identity-provider';
import { UserRepository } from '../repository/user.repository';
import { UserRegistrationDto } from '../dto/user-registration.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @Inject('IdentityProvider') private identityProvider: IdentityProvider,
        @Inject('UserRepository') private userRepository: UserRepository,
        private configService: ConfigService
    ) {}

    async login(email: string, password: string): Promise<string> {
        this.logger.log(`Searching user with email ${email}.`);
        const savedUser = await this.userRepository.findUserByEmail(email);

        if (!savedUser) {
            throw new Error(`Could not find user with email ${email}.`);
        }

        const accessToken = await this.identityProvider.login(savedUser.id, password);

        this.logger.log(`Found user and returned token ${accessToken}.`);
        return accessToken;
    }

    async signUp(user: UserRegistrationDto): Promise<void> {
        this.logger.log(`Checking if user with email ${user.email} exists.`);
        let result;
        try {
            result = await this.userRepository.findUserByEmail(user.email);
        } catch (e) {
            this.logger.log(`No user was found with given email.`);
        }

        if (result) {
            throw new Error('User already exists with given email address');
        }

        this.logger.log(`Signing up user with email ${user.email}.`);

        const savedUser = await this.userRepository.saveUser({
            ...user,
            id: uuid.v5(user.email, this.configService.get('namespace_uuid'))
        });

        await this.identityProvider.signUp(savedUser.id, user.password);
    }

    async updateUserProfile(user: UserUpdateDto): Promise<UserDto> {
        this.logger.log(`Checking if user with id ${user.id} exists.`);
        let savedUser;
        try {
            savedUser = await this.userRepository.findUserByEmail(user.id);
        } catch (e) {
            this.logger.log(`No user was found matching the input ID.`);
            return;
        }

        this.logger.log(`Saving user with id ${user.id}.`);
        return await this.userRepository.saveUser({ email: savedUser.email, ...user });
    }

    async getUser(accessToken: string): Promise<UserDto> {
        this.logger.log(`Getting credentials.`);

        if (!accessToken) {
            return null;
        }

        const ipUser = await this.identityProvider.getUser(accessToken);
        this.logger.log(`Found user ${ipUser} .`);

        const user = await this.userRepository.findUser(ipUser);

        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            website: user.website,
            about: user.about,
            country: user.country,
            street: user.street,
            city: user.city,
            state: user.state,
            zip: user.zip,
            role: user.role
        };
    }
}
