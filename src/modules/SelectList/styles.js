import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const iconStyle = {
    colorSelected   : '#BEBEBE',
    colorAvailable  : colorScheme.persian_green,
    size            : Platform.OS === 'ios' ? pixelratio * 20 : pixelratio * 10
};

export const styles = StyleSheet.create({
    container: {
        marginBottom    : pixelratio * 5
    },
    rowContainer: {
        height          : pixelratio * 22,
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
        marginLeft      : '10%'
    },
    placeholder : {
        height: 10
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
