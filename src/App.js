import React, {Component} from 'react'; // eslint-disable-line
import { Provider } from 'react-redux';
import { Dimensions, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SplashScreen from 'react-native-splash-screen';

import { registerComponents } from 'src/NavigationRegistry';
import configureStore from 'src/store/configureStore';
import { basicStyleSetup } from 'src/config/styles';
import { getTopBarOptions } from 'src/config/navigation';
import * as canteenActions from 'src/actions/canteenActions';
import * as loginActions from 'src/actions/loginActions';
import * as languageActions from 'src/actions/languageActions';
import connector from 'src/backend_connection';
import {colorScheme} from "./config/styles";

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
        if (this.currentRoot !== root ) {
            this.currentRoot = root;

            if (this.currentRoot !== undefined) {
                this.startApp();
            }
        } else if (this.language !== language) {
            this.language = language;
            Navigation.setRoot({
                root: {
                    stack: {
                        children: [
                        ],
                        options: {}
                    }
                }
            });
            store.dispatch(canteenActions.getMenu(language));

            this.startApp();
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
                                    name: 'app.Login',
                                    options: {
                                        topBar: {
                                            visible: false,
                                            drawBehind: true,
                                            animate: false
                                        },
                                        statusBar: {
                                            style: 'light'
                                        }
                                    }
                                },
                            }],
                        }
                    }
                }).catch((err) => { console.log('Navigation set login root problem: ', err)});
                break;
            case 'after-login':
                Navigation.setRoot({
                    root: {
                        sideMenu: {
                            id: 'IDsideMenu',
                            left: {
                                component: {
                                    name: 'app.Settings'
                                }

                            },
                            center: {
                                stack: {
                                    children: [
                                        {
                                            component: {
                                                name: 'app.Dashboard',
                                                options: getTopBarOptions('DASHBOARD', false, false)  // topBarTitle, isDarkScreen, isDetailScreen
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }).catch((err) => { console.log('Navigation set new dashboard root problem: ', err)});
                break;
            default:
                if (__DEV__) {
                    console.log('Unknown app root');
                }
                break;
        }

    }
}
