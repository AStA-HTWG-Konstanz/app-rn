import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_OPENING_HOURS:
            return {
                ...state,           // keep the existing state
                openingHours: action.openingHours
            };
        default:
            return state;
    }
}