import * as Actions from './actions';
import {UnknownAction, User} from '../types';

const initialState = {
  user: {
    nickname: 'Puddin Tame',
    age: 0,
  } as User,
};

export const userReducer = (state = initialState, action: UnknownAction) => {
  let newUser: User;
  switch (action.type) {
    case Actions.INCREMENT_USER_AGE:
      newUser = {...state.user, age: state.user.age + 1};
      break;
    case Actions.SET_USER_AGE:
      newUser = {...state.user, age: action.payload};
      break;
    case Actions.SET_USER_NAME:
      newUser = {...state.user, nickname: action.payload};
      break;
    default:
      return state;
  }
  return {
    ...state,
    user: newUser,
  };
};
