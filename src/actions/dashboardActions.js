import * as types from 'src/actions/actionTypes';
import connector from 'src/backend_connection';

export function setRefreshing(isRefreshing) {
    // call reducer
    return {
        type    : types.SET_REFRESHING,
        isRefreshing : isRefreshing
    }
}

export function getSelectedWidgets() {
    return (dispatch) => {
        connector.getSelectedWidgets()
            .then( function (selection) {
                dispatch(setSelectedWidgets(selection, false));
            })
            .catch((err) => {});
    }
}

export function setSelectedWidgets(widgetSelection, shouldUpdateDatabase) {
    if (shouldUpdateDatabase) {  // function is either dispatched after getting selection or after updating selection
        connector.setSelectedWidgets(widgetSelection);
    }

    return {
        type    : types.SET_SELECTED_WIDGETS,
        widgetSelection : widgetSelection
    }
}
