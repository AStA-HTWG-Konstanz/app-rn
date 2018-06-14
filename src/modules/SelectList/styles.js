import {Dimensions, Platform, StyleSheet} from 'react-native';
import { colorScheme, pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const iconStyle = {
    colorSelected   : '#BEBEBE',
    colorAvailable  : colorScheme.persian_green,
    size            : Platform.OS === 'ios' ? pRatio * 15 : pRatio * 12
};

export const styles = StyleSheet.create({
    container: {
        marginBottom    : pRatio * 5
    },
    rowContainer: {
        height          : pRatio * 17,
        flexDirection   : 'row',
        alignItems      : 'center',
        justifyContent  : 'space-between',
        ...Platform.select({
            ios: {},
            android: {
                marginHorizontal   : '4%',
            },
        }),
    },
    rowContentGroup: {
        alignItems      : 'center',
        flexDirection   : 'row',
        justifyContent  : 'flex-start'
    },
    rowTitle: {
        marginLeft      : pRatio * 3
    },
    placeholder : {
        height: pRatio * 15
    },
    widgetGroupTitle: {
        fontWeight      : 'bold',
        ...Platform.select({
            ios: {},
            android: {
                marginHorizontal   : '5%',
            },
        }),
    }
});
