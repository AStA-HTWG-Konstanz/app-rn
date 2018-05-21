import React, {Component} from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerComponents } from 'src/NavigationRegistry';
import configureStore from 'src/store/configureStore';
import { basicStyleSetup } from 'src/config/styles';
import { genericNavBarStyle } from 'src/config/navigation';

import * as canteenActions from 'src/actions/canteenActions';
import * as loginActions from 'src/actions/loginActions';
import * as languageActions from 'src/actions/languageActions';
import {colorScheme} from 'src/config/styles';
import {ic_burger_android} from 'src/images';


// Setup
const store = configureStore({});  // empty initial state

export default class App extends Component {
    constructor(props) {
        super(props);
        store.dispatch(languageActions.getLanguage());  // Get user selection

        registerComponents(store, Provider);
        basicStyleSetup();

        // Ready to rumble
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(loginActions.appInitialized());
    }

    onStoreUpdate() {
        const state = store.getState();
        const {root} = state.loginReducer;
        const {language} = state.languageReducer;
        // handle a root change
        if (this.currentRoot !== root || this.language !== language) {
            this.currentRoot = root;

            if (this.language !== language) {
                store.dispatch(canteenActions.getMenu(language));
            }
            this.language = language;

            if (this.currentRoot !== undefined) {
                this.startApp();
            }
        }
    }

    startApp() {
        let dashboardScreen = {
            screen: 'app.Dashboard',
            title: 'DASHBOARD',
            navigatorStyle: appNavStyle
        };

        if (Platform.OS === 'android') {
            dashboardScreen.navigatorButtons = {
                leftButtons: [
                    {
                        id: 'sideMenu',
                        icon: ic_burger_android,
                        disableIconTint: true
                    }
                ]
            }
        }

        switch(this.currentRoot) {
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'app.Login',
                        title: 'HTWG Campus',
                        navigatorStyle: loginNavStyle
                    },
                });
                break;
            case 'after-login':
                Navigation.startSingleScreenApp({
                    screen: dashboardScreen,
                    drawer: {
                        left: {
                            screen: 'app.Settings',
                            disableOpenGesture: true
                        },
                        style: {
                            leftDrawerWidth: 100,  // % of the screen width
                            contentOverlayColor: 'rgba(0,0,0,0.35)'
                        }
                    }
                });
                break;
            default:
                console.log('Unknown app root');
                break;

        }

    }
}


const loginNavStyle = {
    navBarHidden: true
};

const appNavStyle = Object.assign({}, genericNavBarStyle, {
    navBarBackgroundColor: colorScheme.botticelli,
    navBarTextColor: 'black'
});
