import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_LECTURES:
            return {
                ...state,           // keep the existing state
                lectures: action.lectures['lectures']   // alternate only the balance property
            };
        default:
            return state;
    }
}