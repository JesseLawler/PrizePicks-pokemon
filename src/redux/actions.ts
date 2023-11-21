import {Dispatch} from 'redux';
import {InternetConnection, PokemonLink} from '../types';

export const ADD_TO_SEARCH_HISTORY = 'ADD_TO_SEARCH_HISTORY';
export const RECEIVE_API_RESPONSE = 'RECEIVE_API_RESPONSE';
export const SET_FAVORITE_TYPE = 'SET_FAVORITE_TYPE';
export const SET_NO_SEARCH_RESULTS = 'SET_NO_SEARCH_RESULTS';
export const SET_SELECTION = 'SET_SELECTION';
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
export const TOGGLE_SHOW_HISTORY = 'TOGGLE_SHOW_HISTORY';
export const UPDATE_INTERNET_CONNECTION = 'UPDATE_INTERNET_CONNECTION';

export const addToSearchHistory =
  (query: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: ADD_TO_SEARCH_HISTORY,
      payload: query,
    });
  };

export const displaySearchResults =
  (apiResponse: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: RECEIVE_API_RESPONSE,
      payload: apiResponse,
    });
  };

export const setFavoriteType =
  (favType: string) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: SET_FAVORITE_TYPE,
      payload: favType,
    });
  };

export const setNoSearchResults = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_NO_SEARCH_RESULTS,
  });
};

export const setSearchString = (str: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_SEARCH_STRING,
    payload: str,
  });
};

export const setSelection =
  (selected: PokemonLink) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: SET_SELECTION,
      payload: selected,
    });
  };

export const toggleShowHistory =
  (isVisible: boolean) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: TOGGLE_SHOW_HISTORY,
      payload: isVisible,
    });
  };

export const updateInternetConnection =
  (connection: InternetConnection) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: UPDATE_INTERNET_CONNECTION,
      payload: connection,
    });
  };
