import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, wideRectangleWidget, widgetShadow } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({

    widgetContainer : Object.assign({}, widgetShadow, wideRectangleWidget, {
        backgroundColor : colorScheme.oxford_blue,
    }),
    titleView       : {
        height          : (width/100) * 13,
        alignItems      : 'center',
        justifyContent  : 'center',
        backgroundColor : 'transparent',
    },
    titleText       : {
        color           : 'white',
        fontSize        : (width/100) * 6,
        fontWeight      : 'normal'
    },
    contentView     : {
        height          : (width/100) * 15,
        alignItems      : 'center',
        backgroundColor : 'transparent',
        justifyContent  : 'center'
    },
    contentText     : {
        color           : 'white',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold'
    }
});
