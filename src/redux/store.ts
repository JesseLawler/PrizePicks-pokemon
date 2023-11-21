import {configureStore} from '@reduxjs/toolkit';
import {generalReducer} from './reducers';

export const store = configureStore({
  reducer: generalReducer, // you could do this way for inferred types: {users: userReducer, posts: postReducer, ... }
  //middleware: [thunk],
});

// infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
