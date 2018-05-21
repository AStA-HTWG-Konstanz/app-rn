import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_BALANCE:
            return {
                ...state,           // keep the existing state
                balance: action.balance   // alternate only the balance property
            };
        default:
            return state;
    }
}