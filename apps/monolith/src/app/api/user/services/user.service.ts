import { Inject, Injectable, Logger } from '@nestjs/common';
import { v5 as uuidv5 } from 'uuid';
import { IdentityProvider } from '../../../shared/identity-provider/identity-provider';
import { UserRepository } from '../repository/user.repository';
import { ConfigService } from '@nestjs/config';
import { UserRegistrationInputDto } from '../dto/user-registration-input.dto';
import { UserInputDto } from '../dto/user-input.dto';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @Inject('IdentityProvider') private identityProvider: IdentityProvider,
        @Inject('UserRepository') private userRepository: UserRepository,
        private jwt: JwtService,
        private configService: ConfigService
    ) {}

    async login(email: string, password: string): Promise<string> {
        this.logger.log(`Searching user with email ${email}.`);
        const savedUser = await this.userRepository.findUserByEmail(email);

        this.logger.log({ message: `Found user`, savedUser });

        if (!savedUser) {
            throw new Error(`Could not find user with email ${email}.`);
        }

        this.logger.log(savedUser.id, password);

        const accessToken = await this.identityProvider.login(savedUser.id, password);

        this.logger.log(`Found user and returned token ${accessToken}.`);
        return accessToken;
    }

    async signUp(user: UserRegistrationInputDto): Promise<void> {
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
            id: uuidv5(user.email, this.configService.get('namespace_uuid'))
        });

        await this.identityProvider.signUp(savedUser.id, user.password);
    }

    async updateUserProfile(accessToken: string, user: UserInputDto): Promise<UserDto> {
        const savedUser = await this.userRepository.findUser(await this.decodeUserToken(accessToken));

        if (!savedUser) {
            throw new Error('Could not find user.');
        }

        this.logger.log(`Saving user with id ${savedUser.id}.`);
        return await this.userRepository.saveUser({ id: savedUser.id, email: savedUser.email, ...user });
    }

    async getUser(accessToken: string): Promise<UserDto> {
        this.logger.log(`Getting user information.`);
        const user = await this.userRepository.findUser(await this.decodeUserToken(accessToken));

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

    async decodeUserToken(accessToken: string): Promise<string> {
        if (!accessToken) {
            throw new Error('Access token undefined.');
        }

        const decodedAccessToken = this.jwt.decode(accessToken) as string;

        return await this.identityProvider.getUser(decodedAccessToken);
    }
}
