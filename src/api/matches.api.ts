import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';

const matchesDocument = gql`
    query {
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
        url: 'https://kf9p4bkih6.execute-api.eu-west-1.amazonaws.com/dev/',
    }),
    endpoints: (builder) => ({
        getMatches: builder.query<
            { matches: TMatch[] },
            { page?: number; filter?: { name?: string; status?: string } }
        >({
            query: (args) => ({
                document: matchesDocument,
                variables: args,
            }),
        }),
    }),
});

export const { useGetMatchesQuery } = matchesApi;
