import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from '../types/user.type';
import { UserDto } from '../dto/user.dto';
import { UserRegistrationInputType } from '../types/user-registration-input.type';
import { UserInputType } from '../types/user-input.type';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserType, { nullable: true })
    async getUser(): Promise<UserDto> {
        Logger.log(this, 'Get user resolver.');
        return await this.userService.getUser();
    }

    @Query(() => Boolean, { nullable: true })
    async login(@Args('email') email: string, @Args('password') password: string, @Context() ctx): Promise<void> {
        Logger.log(this, 'Login resolver.');
        const token = await this.userService.login(email, password);
        ctx.res.cookie('token', token);
    }

    @Mutation(() => Boolean, { nullable: true })
    async signUp(@Args('user') user: UserRegistrationInputType): Promise<void> {
        Logger.log(this, 'Signing up resolver.');
        await this.userService.signUp(user);
    }

    @Mutation(() => Boolean, { nullable: true })
    async logout(@Context() ctx): Promise<void> {
        Logger.log(this, 'Logout resolver.');
        ctx.res.clearCookie('token');
    }

    @Mutation(() => UserType, { nullable: true })
    async updateUserProfile(@Args('user') user: UserInputType): Promise<UserDto> {
        Logger.log(this, 'Update user profile resolver.');
        return await this.userService.updateUserProfile(user);
    }
}
