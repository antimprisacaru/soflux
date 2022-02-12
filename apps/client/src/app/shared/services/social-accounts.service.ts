import { Injectable } from '@angular/core';
import { GraphQLService } from './graphql.service';
import { gql } from 'apollo-angular-boost';
import { SocialPlatform } from '../models/social-platform.model';

@Injectable()
export class SocialAccountsService {
    constructor(private graphQL: GraphQLService) {}

    async saveAccount(code: string, platform: SocialPlatform, redirect): Promise<void> {
        return await this.graphQL.client
            .mutate({
                mutation: gql`
                    mutation ($code: String!, $platform: String!, $redirect: String!) {
                        saveAccount(code: $code, platform: $platform, redirect: $redirect)
                    }
                `,
                variables: {
                    code,
                    platform,
                    redirect
                }
            })
            .then(res => res.errors && Promise.reject());
    }
}
