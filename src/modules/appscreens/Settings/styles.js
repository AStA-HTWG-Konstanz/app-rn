import {Dimensions, PixelRatio, Platform, StyleSheet} from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const iconStyle = {
    color   : 'white',
    size    : pixelratio * 15
};


export const styles = StyleSheet.create({
    page: {
        backgroundColor     : colorScheme.oxford_blue,
        height              : '100%',
    },
    dismissBtn: {
        ...Platform.select({
            ios: {
                marginTop   : pixelratio*15,
                marginLeft  : pixelratio*12
            },
            android: {
                marginTop   : pixelratio*7,
                marginLeft  : pixelratio*5
            }
        }),
    },
    container: {
        marginTop           : pixelratio*6,
        ...Platform.select({
            ios: {

                marginHorizontal    : pixelratio*15,
            },
            android: {

                marginHorizontal    : pixelratio*8,
            }
        }),
        backgroundColor     : 'white',
        alignItems          : 'center'
    },
    separator: {
        height              : (height / 100) * 0.2,
        ...Platform.select({
            ios: {
                width       : (width / 100) * 72,
            },
            android: {
                width       : (width / 100) * 63,
            },
        }),
        backgroundColor     : 'grey'
    },
    panelHeader: {
        height              : (height / 100) * 8,
        width               : (width / 100) * 70,
        flexDirection       : 'row',
        alignItems          : 'center',
        justifyContent      : 'space-between',
        ...Platform.select({
            ios: {},
            android: {
                paddingHorizontal : '6%'
            },
        }),
    },
    panelHeaderText: {
        color               : 'grey'
    },
    panelContentContainer: {
        marginBottom        : '2%',
        ...Platform.select({
            ios: {
                maxWidth            : '82%',
            },
            android: {
                paddingHorizontal   : '7%',
            },
        }),
    },
    creatorsTitle: {
        fontWeight          : '600'
    },
    designersTitle: {
        fontWeight          : '600',
        paddingTop          : 8
    },
    selectRow : {
        height              : 30,
        flexDirection       : 'row',
        justifyContent      : 'flex-start',
        alignItems          : 'center',
        ...Platform.select({
            ios: {},
            android: {
                marginLeft  : '6%'
            },
        }),
    },
    selectRowText: {
        marginLeft          : '5%'
    },
    logout: {
        height              : height / 100 * 8,
        width               : (width / 100) * 70,
        alignItems          : 'center',
        flexDirection       : 'row',
        justifyContent      : 'space-between',
        ...Platform.select({
            ios: {},
            android: {
                marginLeft  : '14%'
            },
        }),
        backgroundColor     : 'white',
    },
    logoutText: {
        color               : colorScheme.persian_green,
    },
    poweredByView: {
        alignItems          : 'center',
        marginTop           : height / 100 * 4,
        width               : '100%'
    },
    poweredByText: {
        color               : 'white',
        fontSize            : (width/100) * 5,
    }
});
