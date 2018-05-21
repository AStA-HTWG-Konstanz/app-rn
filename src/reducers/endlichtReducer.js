import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_ENDLICHT_DATA:
            return {
                ...state,
                endlichtData: action.endlichtData
            };
        default:
            return state;
    }
}