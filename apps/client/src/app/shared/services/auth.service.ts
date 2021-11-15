import { Injectable } from '@angular/core';
import { RegistrationConfirmInput, UserLoginInput, UserRegisterInput } from '../models/auth.model';
import User from '../models/user.model';
import { GraphQLService } from './graphql.service';
import { gql } from 'apollo-angular-boost';

@Injectable()
export class AuthService {
    constructor(private graphQL: GraphQLService) {}

    async login(input: UserLoginInput): Promise<void> {
        return await this.graphQL.client
            .mutate({
                mutation: gql`
                    mutation ($email: String!, $password: String!) {
                        login(email: $email, password: $password)
                    }
                `,
                variables: {
                    email: input.email,
                    password: input.password
                }
            })
            .then(res => res.errors && Promise.reject());
    }

    async signUp(user: UserRegisterInput): Promise<void> {
        return await this.graphQL.client
            .mutate({
                mutation: gql`
                    mutation ($user: UserRegistrationInputType!) {
                        signUp(user: $user)
                    }
                `,
                variables: {
                    user
                }
            })
            .then(res => res.errors && Promise.reject());
    }

    registerConfirm(input: RegistrationConfirmInput): Promise<void> {
        return new Promise<void>(() => console.log());
    }

    async getUser(): Promise<User> {
        return this.graphQL.client
            .query<{ getUser: User }>({
                query: gql`
                    query {
                        getUser {
                            id
                            email
                            firstName
                            lastName
                            website
                            about
                            country
                            street
                            city
                            state
                            zip
                            role
                        }
                    }
                `
            })
            .then(({ data }) => data.getUser);
    }

    async logout(): Promise<void> {
        await this.graphQL.client.mutate<{ logout: void }>({
            mutation: gql`
                mutation {
                    logout
                }
            `
        });
        await this.graphQL.client.resetStore();
    }
}
