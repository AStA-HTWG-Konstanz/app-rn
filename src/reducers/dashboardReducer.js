import * as types from 'src/actions/actionTypes'

export default function (state = {}, action) {
    switch (action.type) {
        case types.SET_REFRESHING:
            return {
                ...state,
                isRefreshing: action.isRefreshing
            };
        case types.SET_SELECTED_WIDGETS:
            return {
                ...state,
                widgetSelection: action.widgetSelection
            };
        default:
            return state;
    }
}
