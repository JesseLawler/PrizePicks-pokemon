import {Dispatch} from 'redux';

export const INCREMENT_USER_AGE = 'INCREMENT_USER_AGE';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';

export const incrementAge = () => (dispatch: Dispatch<any>) => {
  dispatch({
    type: INCREMENT_USER_AGE,
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
