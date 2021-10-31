import { Injectable } from '@angular/core';
import { GraphQLService } from '../../../shared/services/graphql.service';
import User from '../../../shared/models/user.model';
import { gql } from 'apollo-angular-boost';

@Injectable()
export class SettingsService {
    constructor(private graphQL: GraphQLService) {}

    async updateUser(user: User): Promise<void> {
        return await this.graphQL.client
            .mutate({
                mutation: gql`
                    mutation ($user: UserInputType!) {
                        updateUserProfile(user: $user)
                    }
                `,
                variables: {
                    user
                }
            })
            .then(res => res.errors && Promise.reject());
    }
}
