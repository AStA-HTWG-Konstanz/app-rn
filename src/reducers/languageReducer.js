import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return {
                ...state,
                language: action.language
            };
        default:
            return state;
    }
}
