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

const {width} = Dimensions.get('window');

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
            Navigation.events().registerAppLaunchedListener(() => {
                Navigation.setDefaultOptions({
                    topBar: {
                        visible: false,
                    },
                });
            });
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
                                    visible: false,
                                    drawBehind: true,
                                    animate: false,
                                    background: {
                                        color: '#999'
                                    }
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
                        sideMenu: {
                            id: 'idSideMenu',
                            left: {
                                component: {
                                    id: 'idSettings',
                                    name: 'app.Settings',
                                    options: {
                                        disableOpenGesture: true
                                    }
                                }

                            },
                            center: {
                                stack: {
                                    id: 'idAppRoot',
                                    children: [
                                        {
                                            component: {
                                                id: 'idDashboard',  // if you change this id, also change it in BurgerButton/index.js
                                                name: 'app.Dashboard',
                                                options: getTopBarOptions('DASHBOARD', false, false)  // topBarTitle, isDarkScreen, isDetailScreen
                                            }
                                        }
                                    ]
                                }
                            },
                            options: {
                                sideMenu: {
                                    left: {
                                        width: width,  // 100% screen width,
                                        visible: false,
                                        enabled: false
                                    },
                                }
                            }
                        }
                    }
                });
                break;
            default:
                if (__DEV__) {
                    console.log('Unknown app root');
                }
                break;
        }

    }
}
