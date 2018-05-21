import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getGrades() {
    return (dispatch) => {
        connector.getGrades()
            .then( function (grades) {
                    dispatch(receiveGrades(grades));
                }
            ).catch((err) => {});
    }
}

export function receiveGrades(grades) {
    // call reducer
    return {
        type    : types.SET_GRADES,
        grades    : grades
    }
}
