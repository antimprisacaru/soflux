import { Injectable } from '@angular/core';
import { GraphQLService } from './graphql.service';
import { gql } from 'apollo-angular-boost';

@Injectable()
export class SocialAccountsService {
    constructor(private graphQL: GraphQLService) {}

    async saveInstagramAccount(code: string): Promise<void> {
        return await this.graphQL.client
            .mutate({
                mutation: gql`
                    mutation ($code: String!) {
                        saveInstagramAccount(code: $code)
                    }
                `,
                variables: {
                    code
                }
            })
            .then(res => res.errors && Promise.reject());
    }
}
