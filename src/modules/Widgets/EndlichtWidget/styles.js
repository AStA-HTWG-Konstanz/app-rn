import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme, squareWidget, widgetShadow } from 'src/config/styles';
import { pRatio } from 'src/config/styles';


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
    titleText       : {
        color           : 'white',
        fontSize        : (width/100) * 6,
        fontWeight      : 'normal'
    },
    contentView     : {
        alignItems      : 'center',
        backgroundColor : 'transparent',
        justifyContent  : 'center'
    },
    contentText     : {
        color           : 'white',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold',
        lineHeight      : 40
    },
    noDataView      : {
        height          : (width/100)*13,
        alignItems      : 'center',
        justifyContent  : 'center'
    },
    noData          : {
        color           : 'white',
        fontSize        : (width/100) * 10,
        fontWeight      : 'bold'
    },
    noDataGerman    : {
        color           : 'white',
        fontSize        : (width/100) * 7,
        fontWeight      : 'bold'
    }
});
