import { Injectable } from '@angular/core';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { HttpError } from '../errors/errors.actions';

const ignoredErrors = ['getUser'];

@Injectable()
export class GraphQLService {
    public client: ApolloClient<NormalizedCacheObject>;

    constructor(private store: Store<State>) {
        this.init();
    }

    init(): void {
        const httpLink = createHttpLink({
            uri: 'https://60ck6o71ag.execute-api.eu-central-1.amazonaws.com/api',
            credentials: 'include'
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, path }) => {
                    if (!ignoredErrors.find(err => err === path[0])) {
                        this.store.dispatch(new HttpError(message));
                    }
                });
            }

            if (networkError) {
                this.store.dispatch(new HttpError(networkError.message));
            }
        });

        const link = ApolloLink.from([errorLink.concat(httpLink)]);

        this.client = new ApolloClient({
            link,
            cache: new InMemoryCache({ addTypename: false }),
            defaultOptions: {
                query: {
                    fetchPolicy: 'network-only',
                    errorPolicy: 'all'
                },
                mutate: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'none'
                }
            }
        });
    }
}
