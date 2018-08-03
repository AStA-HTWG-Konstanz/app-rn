/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';
import Canteen from 'src/modules/appscreens/Canteen';
import Dashboard from 'src/modules/appscreens/Dashboard';
import Login from 'src/modules/appscreens/Login';
import News from 'src/modules/appscreens/News';
import Settings from 'src/modules/appscreens/Settings';
import LSF from 'src/modules/appscreens/LSF';
import Endlicht from 'src/modules/appscreens/Endlicht';
import Events from 'src/modules/appscreens/Events';
import Grades from 'src/modules/appscreens/Grades';

import BackButton from 'src/modules/BackButton';
import BurgerButton from 'src/modules/BurgerButton';

import React, { Component } from 'react';
import { Provider } from 'react-redux';

export function reduxHOC(Scene, store) {
    return class extends Component {
        static options = {
            ...Scene.options,
        };

        componentDidMount() {
            this.instance = this.refs.child.getWrappedInstance();
        }

        resendEvent = (eventName, params) => {
            if (this.instance && this.instance[eventName]) {
                this.instance[eventName](params);
            }
        };

        componentDidAppear() {
            this.resendEvent('componentDidAppear');
        }

        componentDidDisappear() {
            this.resendEvent('componentDidDisappear');
        }

        onNavigationButtonPressed(buttonId) {
            this.resendEvent('onNavigationButtonPressed', buttonId);
        }

        render() {
            return (
                <Provider store={store}>
                    <Scene ref="child" {...this.props} />
                </Provider>
            );
        }
    };
}

export function registerComponents(store, Provider) {
    // Register screens
    Navigation.registerComponent('app.Canteen', () => reduxHOC(Canteen, store));
    Navigation.registerComponent('app.Dashboard', () => reduxHOC(Dashboard, store));
    Navigation.registerComponent('app.Endlicht', () => reduxHOC(Endlicht, store));
    Navigation.registerComponent('app.Events', () => reduxHOC(Events, store));
    Navigation.registerComponent('app.Grades', () => reduxHOC(Grades, store));
    Navigation.registerComponent('app.Login', () => reduxHOC(Login, store));
    Navigation.registerComponent('app.News', () => reduxHOC(News, store));
    Navigation.registerComponent('app.Settings', () => reduxHOC(Settings, store));
    Navigation.registerComponent('app.LSF', () => reduxHOC(LSF, store));

    // Register topBar buttons
    Navigation.registerComponent('BackButton', () => BackButton);
    Navigation.registerComponent('BurgerButton', () => BurgerButton);
}
