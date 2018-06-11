import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, wideRectangleWidget, widgetShadow, widgetTitleText } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({

    widgetContainer : Object.assign({}, widgetShadow, wideRectangleWidget, {
        backgroundColor : colorScheme.oxford_blue,
    }),
    titleView       : {
        flexDirection   : 'row',
        height          : (width/100) * 13,
        justifyContent  : 'center',
        alignItems      : 'center',
        backgroundColor : 'transparent',
        paddingLeft     : (width/100) * 5,
        paddingRight     : (width/100) * 5,
    },
    titleText       : widgetTitleText,
    contentView     : {
        height          : (width/100) * 13,
        alignItems      : 'center',
        backgroundColor : 'transparent',
        justifyContent  : 'center',
        paddingLeft     : (width/100) * 5,
        paddingRight     : (width/100) * 5,
    },
    contentText     : {
        color           : 'white',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold',
    }
});
