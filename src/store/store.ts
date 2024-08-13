import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

import funcAppSlice from '../api/funcAppSlice';

const store = configureStore({
  reducer: { funcAppSlice, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export default store;

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
