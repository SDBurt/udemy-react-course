import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT
} from '../types';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_START:
            return {
                ...state,
                loading: true,
                error: null,
                token: null,
                userId: null
            };
        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                token: action.idToken,
                userId: action.userId
            };
        case AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
                token: null,
                userId: null
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case SET_AUTH_REDIRECT:
            return {
                ...state,
                authRedirectPath: action.path
            }
        default:
            return state;
    }
}
