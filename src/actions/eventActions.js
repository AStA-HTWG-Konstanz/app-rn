import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getEvents() {
    return (dispatch) => {
        connector.getEvents()
            .then( function (events) {
                    dispatch(receiveEvents(events));
                }
            ).catch((err) => {});
    }
}

export function receiveEvents(events) {
    // call reducer
    return {
        type    : types.SET_EVENTS,
        events  : events
    }
}
