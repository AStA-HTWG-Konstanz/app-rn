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

export const getTopBarOptions = (topBarTitle, isDarkScreen, isDetailScreen) => {
    let topBarButton;
    if (isDetailScreen) {  // topBarButton is the back button
        topBarButton = {
            id: 'idBackButton',
            component: {
                name: 'BackButton',
            },
            text: ''
        }
    } else {  // Dashboard -> burger button
        topBarButton = {
            id: 'idBurgerButton',
            component: {
                name: 'BurgerButton'
            },
            text: ''
        }
    }

    return {
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
            leftButtons: [topBarButton]
        },
        statusBar: {
            style   : isDarkScreen ? 'light' : 'dark'
        },
        sideMenu: {
            left: {
                component: {
                    name: 'app.Settings'
                }
            }
        }
    };
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
