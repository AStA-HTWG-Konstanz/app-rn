import * as types from 'src/actions/actionTypes';
import connector from 'src/backend_connection';

export function getBibOpeningHours() {
    return (dispatch) => {
        connector.getBibOpeningHours()
            .then( function (openingHours) {
                    dispatch(receiveBibOpeningHours(openingHours));
                }
            ).catch((err) => {});
    }
}

export function receiveBibOpeningHours(openingHours) {
    // call reducer
    return {
        type        : types.SET_OPENING_HOURS,
        openingHours: openingHours
    }
}
