import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducers';

const rootReducer = combineReducers({userReducer});

export const store = configureStore({
  reducer: {users: userReducer},
  //middleware: [thunk],
});

// infer `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// inferred types: {posts: PostsState, comments: CommentsState, users: UsersState} // JESSEFIX SOON
export type AppDispatch = typeof store.dispatch;
