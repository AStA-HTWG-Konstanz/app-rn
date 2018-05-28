import SplashScreen from 'react-native-splash-screen';
import * as types from 'src/actions/actionTypes';
import connector from 'src/backend_connection';

export function getLectures() {
    return (dispatch) => {
        connector.getLectures()
            .then( function (lectures) {
                    dispatch(receiveLectures(lectures));
                    SplashScreen.hide();
                }
            ).catch((err) => {});
    }
}

export function receiveLectures(lectures) {
    // call reducer
    return {
        type    : types.SET_LECTURES,
        lectures: lectures
    }
}