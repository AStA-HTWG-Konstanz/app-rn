import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_EVENTS:
            return {
                ...state,           // keep the existing state
                events: action.events   // alternate only the balance property
            };
        default:
            return state;
    }
}