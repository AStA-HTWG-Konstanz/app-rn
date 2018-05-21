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

export function registerComponents(store, Provider) {
    // Register screens
    Navigation.registerComponent('app.Canteen', () => Canteen, store, Provider);
    Navigation.registerComponent('app.Dashboard', () => Dashboard, store, Provider);
    Navigation.registerComponent('app.Endlicht', () => Endlicht, store, Provider);
    Navigation.registerComponent('app.Events', () => Events, store, Provider);
    Navigation.registerComponent('app.Grades', () => Grades, store, Provider);
    Navigation.registerComponent('app.Login', () => Login, store, Provider);
    Navigation.registerComponent('app.News', () => News, store, Provider);
    Navigation.registerComponent('app.Settings', () => Settings, store, Provider);
    Navigation.registerComponent('app.LSF', () => LSF, store, Provider);

    // Register navigation bar buttons
    Navigation.registerComponent('BackButton', () => BackButton);
    Navigation.registerComponent('BurgerButton', () => BurgerButton);
}
