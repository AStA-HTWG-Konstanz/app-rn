import React, {Component} from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';

import { registerComponents } from 'src/NavigationRegistry';
import configureStore from 'src/store/configureStore';
import { basicStyleSetup } from 'src/config/styles';
import { genericNavBarStyle } from 'src/config/navigation';
import * as canteenActions from 'src/actions/canteenActions';
import * as loginActions from 'src/actions/loginActions';
import * as languageActions from 'src/actions/languageActions';
import {colorScheme} from 'src/config/styles';
import {ic_burger_android} from 'src/images';
import connector from 'src/backend_connection';


// Setup
const store = configureStore({});  // empty initial state

export default class App extends Component {
    constructor(props) {
        super(props);
        store.dispatch(languageActions.getLanguage());  // Get user selection

        registerComponents(store, Provider);
        basicStyleSetup();
        connector.createFirstDoc();  // initial database creation

        // Ready to rumble
        store.subscribe(this.onStoreUpdate.bind(this));
        store.dispatch(loginActions.appInitialized());

        if (Platform.OS === 'android') {
            SplashScreen.hide();
        }
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
        switch(this.currentRoot) {
            case 'login':
                Navigation.setRoot({
                    root: {
                        stack: {
                            children: [{
                                component: {
                                    name: 'app.Login'
                                }
                            }],
                            options: {
                                topBar: {
                                    visible: false
                                },
                                statusBar: {
                                    style: 'light'
                                }
                            }
                        }
                    }
                });
                break;
            case 'after-login':
                Navigation.setRoot({
                    root: {
                        stack: {
                            children: [{
                                component: {
                                    name: 'app.Dashboard'
                                }
                            }],
                            options: {
                                topBar: {
                                    visible: false,
                                    leftButtons : {
                                        id: 'sideMenu',
                                        component: {
                                            name: 'BurgerButton'
                                        },
                                        disableIconTint: false
                                    }
                                },
                                statusBar: {
                                    style: 'light'
                                }
                            }
                        },
                        sideMenu: {
                            left: {
                                component: {
                                    name: 'app.Settings'
                                },
                                width: 100
                            }
                        }
                    }
                });
                /*
                Navigation.startSingleScreenApp({
                    screen: dashboardScreen,
                    drawer: {
                        left: {
                            screen: 'app.Settings'
                        },
                        style: {
                            leftDrawerWidth: 100,  // % of the screen width
                            contentOverlayColor: 'rgba(0,0,0,0.35)'
                        },
                        disableOpenGesture: true
                    }
                });
                */
                break;
            default:
                console.log('Unknown app root');
                break;
        }

    }
}


const appNavStyle = Object.assign({}, genericNavBarStyle, {
    navBarBackgroundColor: colorScheme.botticelli,
    navBarTextColor: 'black',
    statusBarTextColorScheme: 'dark',
    statusBarColor: colorScheme.blue_stone_dark
});
