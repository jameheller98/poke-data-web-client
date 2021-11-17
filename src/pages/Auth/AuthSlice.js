/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { user } from '../../adapters/UserAdapter';

export async function fetchCurrentUser(dispatch) {
  dispatch({ type: 'auth/authLoading' });
  try {
    const currentUser = await user.getCurrentUser();
    dispatch({ type: 'auth/getCurrentUserLoaded', payload: currentUser });
  } catch (err) {
    dispatch({ type: 'auth/authError', message: err });
  }
}

export default function authReducer(state = { loading: false, error: false, data: { currentUser: {} } }, action) {
  switch (action.type) {
    case 'auth/authLoading':
      return { ...state, loading: true };
    case 'auth/getCurrentUserLoaded':
      return { ...state, loading: false, data: { ...state.data, currentUser: action.payload } };
    case 'auth/authError':
      return { ...state, loading: false, error: action.payload };
    case 'auth/authLogout':
      return { ...state, data: { currentUser: {} } };
    default:
      return state;
  }
}

export const logoutCurrentUser = (dispatch) => {
  dispatch({ type: 'auth/authLogout' });
};

export const selectCurrentUser = (state) => {
  return state.auth?.data.currentUser;
};
