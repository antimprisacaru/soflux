import { Logger, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInputType } from '../types/user-registration-input.type';
import { UserInputType } from '../types/user-input.type';
import { GqlAuthGuard } from "../../../common/auth/guards/gql-auth.guard";
import { UserToken } from "../../../common/auth/decorators/user-token.decorator";

@Resolver('User')
export class UserResolver {
    private readonly logger = new Logger(UserResolver.name);

    constructor(private readonly userService: UserService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => UserType, { nullable: true })
    async getUser(@UserToken() accessToken: string): Promise<UserDto> {
        this.logger.log('Get user resolver.');
        return await this.userService.getUser(accessToken);
    }

    @Mutation(() => Boolean, { nullable: true })
    async login(@Args('email') email: string, @Args('password') password: string): Promise<void> {
        this.logger.log('Login resolver.');
        await this.userService.login(email, password);
    }

    @Mutation(() => Boolean, { nullable: true })
    async signUp(@Args('user') user: UserRegistrationInputType): Promise<void> {
        this.logger.log('Signing up resolver.');
        await this.userService.signUp(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean, { nullable: true })
    async logout(): Promise<void> {
        this.logger.log('Logout resolver.');
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserType, { nullable: true })
    async updateUserProfile(@Args('user') user: UserInputType): Promise<UserDto> {
        this.logger.log('Update user profile resolver.');
        return await this.userService.updateUserProfile(user);
    }
}
