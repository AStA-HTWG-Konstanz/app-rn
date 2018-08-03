import { Platform } from 'react-native';
import { ic_back, ic_burger, ic_burger_android } from 'src/images';
import { colorScheme } from 'src/config/styles';
import {pRatio} from "./styles";

export const getBackButton = (navigator) => {
    if (Platform.OS === 'ios') {
        return {
            leftButtons: [
                {
                    id: 'back'
                }
            ]
        };
    } else {
        return {
            leftButtons: [
                {
                    id: 'back',
                    icon: ic_back,
                    disableIconTint: true
                }
            ]
        };
    }
};

export const getSettingsButton = (navigator) => {
    if (Platform.OS === 'ios') {
        return {
            leftButtons: [
                {
                    id: 'sideMenu',
                    component: 'BurgerButton',
                    disableIconTint: true,
                    passProps: {
                        passedNavigator: navigator
                    }
                }
            ]
        };
    }
};

export const getTopBarOptions = (topBarTitle, isDarkScreen, isDetailScreen, screenId) => {
    let topBarOptions = {
        topBar: {
            title   : {
                text        : topBarTitle,
                fontSize    : pRatio * 10,
                fontFamily  : 'Swiss721',
                color       : isDarkScreen ? 'white' : 'black'
            },
            background: {
                color       : isDarkScreen ? colorScheme.blue_stone_dark : colorScheme.botticelli
            },
        },
        statusBar: {
            style   : isDarkScreen ? 'light' : 'dark',  // iOS
            backgroundColor: isDarkScreen? colorScheme.botticelli : colorScheme.blue_stone_dark  // Android
        }
    };

    if (isDetailScreen) {  // topBarButton is the back button
        topBarOptions.topBar.leftButtons = {
            id: 'idBackButton',
            component: {
                name: 'BackButton',
                passProps: {screenId}
            },
            text: ''
        }
    } else {  // Dashboard
        topBarOptions.topBar.leftButtons = {
            id: 'idBurgerButton',
            component: {
                name: 'BurgerButton'
            },
            text: ''
        };

        topBarOptions.sideMenu = {
            left: {
                component: {
                    name: 'app.Settings'
                }
            }
        }
    }

    return topBarOptions;
};

export const genericNavBarStyle = {
    topBarElevationShadowEnabled: false,
    navBarNoBorder: true,
    navBarTextFontFamily: 'Swiss721',
    navBarTitleTextCentered: true,
    navBarTextFontSize: 25,
    navBarTextFontBold: false,
    navBarButtonColor: colorScheme.persian_green
};
