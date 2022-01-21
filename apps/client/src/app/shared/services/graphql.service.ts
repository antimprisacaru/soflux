import { Injectable } from '@angular/core';
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Store } from '@ngrx/store';
import { State } from '../../state';
import { HttpError } from '../errors/errors.actions';
import { setContext } from "@apollo/client/link/context";

const ignoredErrors = ['getUser'];
const AUTH_TOKEN = 'authorization';

@Injectable()
export class GraphQLService {
    public client: ApolloClient<NormalizedCacheObject>;

    constructor(private store: Store<State>) {
        this.init();
    }

    init(): void {
        const httpLink = createHttpLink({
            uri: '/graphql',
            credentials: 'include',
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, path, extensions }) => {
                    if (extensions.code === 'UNAUTHENTICATED') {
                        return;
                    }
                    if (!ignoredErrors.find(err => err === path[0])) {
                        this.store.dispatch(new HttpError(message));
                    }
                });
            }

            if (networkError) {
                this.store.dispatch(new HttpError(networkError.message));
            }
        });

        const auth = setContext(() => {
            const token = localStorage.getItem(AUTH_TOKEN);

            if (token === null) {
                return {};
            } else {
                return {
                    headers: {
                        Authorization: token
                    }
                };
            }
        });

      const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
          const context = operation.getContext()
          const {
            response: { headers }
          } = context

          if (headers) {
            const authToken = headers.get('Authorization') || headers.get('x-amzn-remapped-authorization')
            if (authToken) {
              localStorage.setItem(AUTH_TOKEN, authToken)
            }
          }

          return response
        })
      })

        const link = ApolloLink.from([afterwareLink, auth, errorLink, httpLink]);

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
