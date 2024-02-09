import { configureStore } from '@reduxjs/toolkit';
import { playersApi } from '../api/players.api';
import { matchesApi } from '../api/matches.api';

const store = configureStore({
    reducer: {
        [playersApi.reducerPath]: playersApi.reducer,
        [matchesApi.reducerPath]: matchesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            playersApi.middleware,
            matchesApi.middleware
        ),
});

export default store;
