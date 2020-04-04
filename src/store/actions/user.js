import * as actionTypes from './actionTypes';
import axios from 'axios';

export const registerUser = (formData) => {
  return async (dispatch) => {
    dispatch(registerUserStart());
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users',
        formData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'name',
        JSON.stringify({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
        })
      );
      dispatch(registerUserSuccess(response.data));
      dispatch(checkTokenTimeout());
    } catch (error) {
      dispatch(registerUserFail(error.response.data.error));
    }
  };
};

export const registerUserStart = () => {
  return {
    type: actionTypes.REGISTER_USER_START,
  };
};

export const registerUserSuccess = (formData) => {
  return {
    type: actionTypes.REGISTER_USER_SUCCESS,
    formData,
  };
};

export const registerUserFail = (error) => {
  return {
    type: actionTypes.REGISTER_USER_FAIL,
    error,
  };
};

export const registerUserInit = () => {
  return {
    type: actionTypes.REGISTER_USER_INIT,
  };
};

export const fetchUser = (token) => {
  return async (dispatch) => {
    dispatch(fetchUserStart());
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: token },
      });
      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserFail(error));
    }
  };
};

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};

export const fetchUserSuccess = (userData) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    userData,
  };
};

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error,
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserStart());
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/logout', {
        headers: { Authorization: token },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      dispatch(logoutUserSuccess());
    } catch (error) {
      console.log(error.response.data);
      dispatch(logoutUserFail(error.response.data));
    }
  };
};

export const logoutUserStart = () => {
  return {
    type: actionTypes.LOGOUT_USER_START,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: actionTypes.LOGOUT_USER_SUCCESS,
  };
};

export const logoutUserFail = (error) => {
  return {
    type: actionTypes.LOGOUT_USER_FAIL,
    error,
  };
};

export const checkTokenTimeout = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, 3600 * 1000);
  };
};

export const loginUser = (formData) => {
  return async (dispatch) => {
    dispatch(loginUserStart());
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        formData
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'name',
        JSON.stringify({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
        })
      );
      dispatch(loginUserSuccess(response.data));
      dispatch(checkTokenTimeout());
    } catch (error) {
      dispatch(loginUserFail(error.response.data.error));
    }
  };
};

export const loginUserStart = () => {
  return {
    type: actionTypes.LOGIN_USER_START,
  };
};

export const loginUserSuccess = (formData) => {
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    formData,
  };
};

export const loginUserFail = (error) => {
  return {
    type: actionTypes.LOGIN_USER_FAIL,
    error,
  };
};
