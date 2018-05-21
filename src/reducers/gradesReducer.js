import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_GRADES:
            return {
                ...state,
                grades: action.grades
            };
        default:
            return state;
    }
}