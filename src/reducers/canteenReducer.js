import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_MENU:
            return {
                ...state,           // keep the existing state
                menu: action.menu   // alternate only the menu property
            };
        default:
            return state;
    }
}