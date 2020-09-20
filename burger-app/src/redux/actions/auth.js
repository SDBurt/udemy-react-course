import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT
} from '../types';
import axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        userId: userId,
        idToken: token
    };
}

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT,
        path: path
    }
}

export const authLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {

        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: "true"
        }

        const apikey = 'AIzaSyDtd7fiNam1KERP2njgxDeJubfXGIwTAi0'

        let type = "signUp"
        if (!isSignup) {
            type = "signInWithPassword"
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${apikey}`

        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(authLogout());
            }
        }
    }

}