import {Dispatch} from 'redux';

export const INCREMENT_USER_AGE = 'INCREMENT_USER_AGE';
export const SEARCH_FOR_STRING = 'SEARCH_FOR_STRING';
export const SET_SELECTION = 'SET_SELECTION';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const TOGGLE_SHOW_HISTORY = 'TOGGLE_SHOW_HISTORY';

export const incrementAge = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: INCREMENT_USER_AGE,
  });
};

export const searchForString = (query: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SEARCH_FOR_STRING,
    payload: query,
  });
};

export const setSelection = (selected: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_SELECTION,
    payload: selected,
  });
};

export const setName = (name: string) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setAge = (age: number) => (dispatch: Dispatch<any>) => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};

export const toggleShowHistory =
  (isVisible: boolean) => (dispatch: Dispatch<any>) => {
    dispatch({
      type: TOGGLE_SHOW_HISTORY,
      payload: isVisible,
    });
  };
