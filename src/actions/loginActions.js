import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as types from 'src/actions/actionTypes';
import connector from 'src/backend_connection/';
import { fetchInitialData } from 'src/actions';
import { getSelectedWidgets } from 'src/actions/dashboardActions';
import { strings } from 'src/i18n';
import Toast from 'react-native-simple-toast';

export function appInitialized() {
    return async function(dispatch, getState) {
        connector.getCredentials()
        .then((credentials) => {
            dispatch(changeUsername(credentials.username));
            dispatch(changePassword(credentials.password));
            dispatch(changeRememberMe(credentials.rememberMe));

            // Try to login
            dispatch(login(true));
        }).catch((err) => {});
    };
}

export function changeAppRoot(root) {
    return {
        type: types.ROOT_CHANGED,
        root: root
    };
}

export function changeUsername(text) {
    return {
        type: types.CHANGED_USERNAME,
        username: text
    }
}

export function changePassword(text) {
    return {
        type: types.CHANGED_PASSWORD,
        password: text
    }
}

export function changeRememberMe (value) {
    return {
        type: types.CHANGED_REMEMBER_ME,
        rememberMe: value
    }
}

export function setIsStudent(isStudent) {
    return {
        type: types.SET_IS_STUDENT,
        isStudent: isStudent
    }
}

// first try -> after initializing the app, we try to login with stored credentials
export function login(firstTry) {
      return function(dispatch, getState) {
            const currentState = getState().loginReducer;
            if (!currentState.username || currentState.username === '') {  // no credentials stored or entered
                dispatch(changeAppRoot('login'));

                if (Platform.OS === 'ios') {
                    setTimeout(() => {  // first app start, hold splashscreen a little bit longer
                        SplashScreen.hide();
                    }, 1500);
                }
                return;
            }
            connector.login(currentState.username, currentState.password, currentState.rememberMe)
                .then((result) => {
                    if(result.success){
                        dispatch(setIsStudent(result.isStudent));
                        dispatch(changeAppRoot('after-login'));

                        // Start fetching data
                        dispatch(fetchInitialData());
                        dispatch(getSelectedWidgets());  // get widget selection from local storage
                    }
                    else{
                        if (Platform.OS === 'ios') {
                            SplashScreen.hide();  // show login screen
                        }
                        if (firstTry) {
                            dispatch(changeAppRoot('login'));
                        } else {
                            Toast.show(strings('general.wrongCredentials'), Toast.LONG);
                        }
                    }
            }).catch((err) => {});
      };
}
