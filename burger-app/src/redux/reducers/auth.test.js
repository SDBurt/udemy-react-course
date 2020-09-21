import reducer from './auth';
import * as actions from '../types';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: "/"
        }, {
            type: actions.AUTH_SUCCESS,
            idToken: 'some-idToken',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-idToken',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: "/"
        });
    })
})