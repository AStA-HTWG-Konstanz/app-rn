import { Platform } from 'react-native';
import { ic_back, ic_burger, ic_burger_android } from 'src/images';
import { colorScheme } from 'src/config/styles';

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

export const genericNavBarStyle = {
    topBarElevationShadowEnabled: false,
    navBarNoBorder: true,
    navBarTextFontFamily: 'Swiss721',
    navBarTitleTextCentered: true,
    navBarTextFontSize: 25,
    navBarTextFontBold: false,
    navBarButtonColor: colorScheme.persian_green
};
