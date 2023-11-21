import * as Actions from './actions';
import {Pokemon, PokemonLink, SAMPLE_POKEMON, UnknownAction} from '../types';

const initialState = {
  favoriteType: '',
  internetConnection: {
    connectionType: 'unknown',
    isConnected: false,
  },
  searchFailed: false,
  searchHistory: [] as string[],
  searchResultsIsLoading: false,
  searchResult: null as Pokemon | null,
  searchResultsSelection: SAMPLE_POKEMON,
  searchString: '',
  selection: undefined as PokemonLink | undefined,
  showHistory: false,
};

export const generalReducer = (state = initialState, action: UnknownAction) => {
  switch (action.type) {
    case Actions.ADD_TO_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: [action.payload, ...state.searchHistory], // Add the latest query to the growing searchHistory array
        searchResultsIsLoading: true,
      };

    case Actions.RECEIVE_API_RESPONSE:
      //console.log(`official image: ${action.payload.sprites.other.home.front_default}`);
      return {
        ...state,
        searchResult: action.payload,
        searchResultsIsLoading: false,
      };

    case Actions.SET_FAVORITE_TYPE:
      return {...state, favoriteType: action.payload};

    case Actions.SET_NO_SEARCH_RESULTS:
      return {...state, searchFailed: true, searchResultsIsLoading: false};

    case Actions.SET_SEARCH_STRING:
      return {
        ...state,
        searchFailed: false,
        searchResult: null,
        searchString: action.payload,
      };

    case Actions.SET_SELECTION:
      return {...state, selection: action.payload};

    case Actions.TOGGLE_SHOW_HISTORY:
      return {...state, showHistory: action.payload};

    case Actions.UPDATE_INTERNET_CONNECTION:
      //console.log(`Internet status: ${JSON.stringify(action.payload)}`);
      return {...state, internetConnection: action.payload};

    default:
      return state;
  }
};
