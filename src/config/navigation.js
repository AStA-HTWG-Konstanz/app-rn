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
                fontSize    : pRatio * 10,
                fontFamily  : 'Swiss721',
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

    if (isDetailScreen) {  // topBarButton is the back button
        if (Platform.OS === 'ios') {
            topBarOptions.topBar.leftButtons = {
                id: 'idBackButton',
                component: {
                    name: 'BackButton',
                    passProps: {screenId}
                },
                text: ''
            }
        } else {
            topBarOptions.topBar.leftButtons = {
                id: 'back',
                icon: ic_back_android
            }
        }
    } else {  // Dashboard
        topBarOptions.sideMenu = {
            left: {
                component: {
                    name    : 'app.Settings'
                },
                width: width,  // 100% screen width
                visible: false,
                enabled: false
            }
        }
    }

    return topBarOptions;
};
