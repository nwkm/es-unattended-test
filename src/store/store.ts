import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { playersApi } from '../api/players.api';
import { matchesApi } from '../api/matches.api';

const reducer = combineReducers({
    [playersApi.reducerPath]: playersApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                playersApi.middleware,
                matchesApi.middleware
            ),
    });
};

export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
