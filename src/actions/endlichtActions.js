import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getEndlichtData() {
    return (dispatch) => {
        connector.getEndlichtData()
            .then( function (endlichtData) {
                    dispatch(receiveEndlichtData(endlichtData));
                }
            ).catch((err) => {});
    }
}

export function receiveEndlichtData(endlichtData) {
    // call reducer
    return {
        type                : types.SET_ENDLICHT_DATA,
        endlichtData     : endlichtData
    }
}