import { colorScheme } from 'src/config/styles';
import { pRatio } from 'src/config/styles';
import { Dimensions, Platform } from 'react-native';
import { ic_back_android } from 'src/images';

const {width} = Dimensions.get('window');

export const getTopBarOptions = (topBarTitle, isDarkScreen, isDetailScreen, screenId) => {
    let topBarOptions = {
        topBar: {
            title   : {
                text        : topBarTitle,
                color       : isDarkScreen ? 'white' : 'black',
                alignment   : 'center'
            },
            background: {
                color       : isDarkScreen ? colorScheme.oxford_blue : colorScheme.botticelli
            },
        },
        statusBar: {
            style           : isDarkScreen ? 'light' : 'dark',  // iOS
            backgroundColor : isDarkScreen? colorScheme.botticelli : colorScheme.oxford_blue  // Android
        }
    };

    if (Platform.OS === 'android') topBarOptions.topBar.title['fontFamily']  = 'Swiss721';  // ios doesn't work at the moment

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
            id: 'idSideMenuBtn',
            component: {
                name: 'BurgerButton',
                passProps: {screenId}
            },
            text: ''
        };

        topBarOptions.sideMenu = {
            left: {
                component: {
                    name    : 'app.Settings'
                },
                width: width,  // 100% screen width
                visible: false,
                enabled: false
            }
        };
    }

    return topBarOptions;
};
