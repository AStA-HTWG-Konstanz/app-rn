import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, squareWidget, widgetShadow, widgetTitleText } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({

    widgetContainer : Object.assign({}, widgetShadow, squareWidget, {
        backgroundColor : colorScheme.oxford_blue,
    }),
    titleView       : {
        height          : (width/100) * 13,
        alignItems      : 'center',
        backgroundColor : 'transparent',
        justifyContent  : 'center',
    },
    titleText       : widgetTitleText,
    contentView     : {
        height          : (width/100) * 15,
        alignItems      : 'center',
        backgroundColor : 'transparent',
        justifyContent  : 'center',
    },
    contentText     : {
        color           : 'white',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold'
    }
});
