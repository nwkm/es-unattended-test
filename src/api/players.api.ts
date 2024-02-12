import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const playersDocument = gql`
    query GetPlayers {
        players {
            id
            firstname
            lastname
            sex
            shortname
            picture {
                url
            }
            country {
                picture {
                    url
                }
                code
            }
            stats {
                rank
                points
                weight
                height
                age
            }
        }
    }
`;

export const playersApi = createApi({
    reducerPath: 'playersApi',
    baseQuery: graphqlRequestBaseQuery({
        url: import.meta.env.VITE_GRAPHQL_URL,
    }),
    endpoints: (builder) => ({
        getPlayers: builder.query<
            { players: TPlayer[] },
            { filter?: { id?: string } }
        >({
            query: (args) => ({
                document: playersDocument,
                variables: args,
            }),
        }),
    }),
});

export const { useGetPlayersQuery } = playersApi;
