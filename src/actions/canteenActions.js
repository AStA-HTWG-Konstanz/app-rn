import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getMenu(language) {
    return (dispatch) => {
        connector.getMenu(language)
            .then( function (menu) {
                    dispatch(receiveMenu(menu));
                }
            ).catch((err) => {});
    }
}

export function receiveMenu(menu) {
    // call reducer
    return {
        type    : types.SET_MENU,
        menu    : menu
    }
}
