import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, squareWidget, widgetShadow, widgetTitleText } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    widgetContainer : Object.assign({}, widgetShadow, squareWidget, {
        borderWidth     : 0.3,
        borderColor     : 'lightgrey',
    }),
    titleView           : {
        height          : (width/100) * 13,
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
        justifyContent  : 'center',
    },
    titleText       : widgetTitleText,
    contentView     : {
        height          : (width/100) * 15,
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
        justifyContent  : 'center',
        zIndex          : 4,

    },
    contentText     : {
        color           : 'black',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold',
        flex            : 1,
        alignItems      : 'center'
    },

    /*tempV           : {
        height          : (width/100) * 7,
        //width           : '100%',
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
        justifyContent  : 'center',
        zIndex          : 2,
        borderWidth:1
    },
    tempT: {
        textAlign       : 'center',
        justifyContent  : 'center',
        color           : 'black',
        fontWeight      : 'bold',
        fontSize        : (width/100) * 6,
        flex: 1,
        alignItems: 'center'
    }*/
});