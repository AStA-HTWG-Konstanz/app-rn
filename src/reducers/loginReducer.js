import * as types from 'src/actions/actionTypes';

const initialState = {
    root: undefined // 'login' / 'after-login'
};

export default function app(state = initialState, action = {}) {
    switch (action.type) {
        case types.ROOT_CHANGED:
            return {
                ...state,
                root: action.root
            };
        case types.CHANGED_USERNAME:
            return {
                ...state,
                username: action.username
            };
        case types.CHANGED_PASSWORD:
            return{
                ...state,
                password: action.password
            };
        case types.CHANGED_REMEMBER_ME:
            return{
                ...state,
                rememberMe: action.rememberMe
            };
        default:
            return state;
    }
}