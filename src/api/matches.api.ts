import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const matchesDocument = gql`
    query GetMatches {
        matches {
            players {
                id
            }
            winner {
                id
            }
            startTime
            endTime
        }
    }
`;

export const matchesApi = createApi({
    reducerPath: 'matchesApi',
    baseQuery: graphqlRequestBaseQuery({
        url: import.meta.env.VITE_GRAPHQL_URL,
    }),
    endpoints: (builder) => ({
        getMatches: builder.query<
            { matches: TMatch[] },
            { filter?: { id?: string } }
        >({
            query: (args) => ({
                document: matchesDocument,
                variables: args,
            }),
        }),
    }),
});

export const { useGetMatchesQuery } = matchesApi;
