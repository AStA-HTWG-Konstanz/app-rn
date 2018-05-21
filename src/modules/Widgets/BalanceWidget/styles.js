import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, highRectangleWidget, widgetShadow } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({

    widgetContainer : Object.assign({}, widgetShadow, highRectangleWidget, {
        borderWidth     : 0.3,
        borderColor     : 'lightgrey',
    }),
    titleView : {
        height          : (width/100) * 13,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
    },
    titleText : {
        color           : 'black',
        fontSize        : (width/100) * 6,
        fontWeight      : 'normal'
    },

    specifierView : {
        height          : (width/100) * 15,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
    },
    specifierText : {
        color           : 'black',
        fontSize        : (width/100) * 6,
        fontWeight      : 'normal'
    },

    contentView : {
        height          : (width/100) * 23.5,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : colorScheme.botticelli,
    },
    contentText : {
        color           : 'black',
        fontSize        : (width/100) * 11,
        fontWeight      : 'bold'
    }
});
