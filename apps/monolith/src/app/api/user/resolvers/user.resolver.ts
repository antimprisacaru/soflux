import { Logger, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInputDto } from '../dto/user-registration-input.dto';
import { UserInputDto } from '../dto/user-input.dto';
import { GqlAuthGuard } from '../../../common/auth/guards/gql-auth.guard';
import { UserToken } from '../../../common/auth/decorators/user-token.decorator';
import { JwtService } from '@nestjs/jwt';

@Resolver('User')
export class UserResolver {
    private readonly logger = new Logger(UserResolver.name);

    constructor(private readonly jwt: JwtService, private readonly userService: UserService) {}

    @UseGuards(GqlAuthGuard)
    @Query(() => UserDto, { nullable: true })
    async getUser(@UserToken() accessToken: string): Promise<UserDto> {
        this.logger.log('Get user resolver.');
        return await this.userService.getUser(accessToken);
    }

    @Mutation(() => Boolean, { nullable: true })
    async login(@Args('email') email: string, @Args('password') password: string, @Context() ctx: any): Promise<void> {
        this.logger.log('Login resolver.');
        ctx.res.setHeader('Authorization', `Bearer ${this.jwt.sign(await this.userService.login(email, password))}`);
    }

    @Mutation(() => Boolean, { nullable: true })
    async signUp(@Args('user') user: UserRegistrationInputDto): Promise<void> {
        this.logger.log('Signing up resolver.');
        await this.userService.signUp(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean, { nullable: true })
    async logout(@Context() ctx: any): Promise<void> {
        this.logger.log('Logout resolver.');
        ctx.res.removeHeader('Authorization');
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserDto, { nullable: true })
    async updateUserProfile(@UserToken() accessToken: string, @Args('user') user: UserInputDto): Promise<UserDto> {
        this.logger.log('Update user profile resolver.');
        return await this.userService.updateUserProfile(accessToken, user);
    }
}
