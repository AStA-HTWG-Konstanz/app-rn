import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, squareWidget, widgetShadow } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({

    widgetContainer : Object.assign({}, widgetShadow, squareWidget, {
        borderWidth     : 0.3,
        borderColor     : 'lightgrey',
        backgroundColor : '#f1f1f1',
    }),
    titleView       : {
        height          : (width/100) * 13,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : '#f1f1f1',
    },
    titleText       : {
        color           : 'black',
        fontSize        : (width/100) * 5,
    },
    contentView     : {
        height          : (width/100) * 15,
        alignItems      : 'center',
        justifyContent  : 'center',
    },
    contentText     : {
        color           : 'black',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold'
    },
    specifierView   : {
        height          : (width/100) * 15,
        justifyContent  : 'center',
        alignItems      : 'center',
    },
    specifierText   : {
        color           : 'black',
        fontSize        : (width/100) * 6,
        fontWeight      : 'normal'
    }
});
