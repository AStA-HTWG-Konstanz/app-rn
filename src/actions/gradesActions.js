import * as types from 'src/actions/actionTypes'
import connector from 'src/backend_connection';

export function getGrades() {
    return (dispatch, getState) => {
        const currentState = getState().loginReducer;
        const username = currentState.username;
        const password = currentState.password;
        connector.getGrades(username, password)
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
