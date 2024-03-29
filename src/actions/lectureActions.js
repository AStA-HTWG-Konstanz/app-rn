import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as types from 'src/actions/actionTypes';
import connector from 'src/backend_connection';

export function getLectures() {
    return (dispatch, getState) => {
        const {isStudent, username, password} = getState().loginReducer;
        connector.getLectures(username, password, isStudent)
            .then( function (lectures) {
                    if (Platform.OS === 'ios') {
                        SplashScreen.hide();
                    }
                    dispatch(receiveLectures(lectures));
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