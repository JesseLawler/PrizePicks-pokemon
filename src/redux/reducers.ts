import * as Actions from './actions';
import {UnknownAction, User} from '../types';

const initialState = {
  internetConnection: {
    connectionType: 'unknown',
    isConnected: false,
  },
  searchResultsIsLoading: false,
  searchResults: [] as string[],
  selection: '',
  showHistory: false,
  user: {
    nickname: 'Puddin Tame',
    age: 0,
  } as User,
};

export const userReducer = (state = initialState, action: UnknownAction) => {
  let newUser: User;
  switch (action.type) {
    case Actions.DISPLAY_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: runSearchQuery(action.payload),
        searchResultsIsLoading: false,
      };

    case Actions.INCREMENT_USER_AGE:
      newUser = {...state.user, age: state.user.age + 1};
      break;

    case Actions.SEARCH_FOR_STRING:
      return {...state, searchResultsIsLoading: true};

    case Actions.SET_SELECTION:
      return {...state, selection: action.payload};

    case Actions.SET_USER_AGE:
      newUser = {...state.user, age: action.payload};
      break;

    case Actions.SET_USER_NAME:
      newUser = {...state.user, nickname: action.payload};
      break;

    case Actions.TOGGLE_SHOW_HISTORY:
      return {...state, showHistory: action.payload};

    case Actions.UPDATE_INTERNET_CONNECTION:
      console.log(`Internet status: ${JSON.stringify(action.payload)}`);
      return {...state, internetConnection: action.payload};

    default:
      return state;
  }
  return {
    ...state,
    user: newUser,
  };
};

const runSearchQuery = (query: string) => {
  const numericBit = Number(query.match(/\d+/)) ?? 0;
  const resultArr = [];
  for (let i = 0; i < 3; i++) resultArr.push(`result ${i * numericBit}`);
  return resultArr;
};
