import { colorScheme } from 'src/config/styles';
import { pRatio } from 'src/config/styles';


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
            style           : isDarkScreen ? 'light' : 'dark',  // iOS
            backgroundColor : isDarkScreen? colorScheme.botticelli : colorScheme.blue_stone_dark  // Android
        }
    };

    if (isDetailScreen) {  // topBarButton is the back button
        topBarOptions.topBar.leftButtons = {
            id: 'idBackButton',
            component: {
                name        : 'BackButton',
                passProps   : {screenId}
            },
            text: ''
        }
    } else {  // Dashboard
        topBarOptions.topBar.leftButtons = {
            id              : 'idBurgerButton',
            component: {
                name        : 'BurgerButton'
            },
            text: ''
        };

        topBarOptions.sideMenu = {
            left: {
                component: {
                    name    : 'app.Settings'
                }
            }
        }
    }

    return topBarOptions;
};
