import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const playersDocument = gql`
    query {
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
        url: 'https://kf9p4bkih6.execute-api.eu-west-1.amazonaws.com/dev/',
    }),
    endpoints: (builder) => ({
        getPlayers: builder.query<
            { players: TPlayer[] },
            { page?: number; filter?: { name?: string; status?: string } }
        >({
            query: (args) => ({
                document: playersDocument,
                variables: args,
            }),
        }),
    }),
});

export const { useGetPlayersQuery } = playersApi;
