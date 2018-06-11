import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colorScheme, pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
    page: {
        paddingTop         : '15%',
        paddingLeft        : '10%',
        paddingRight       : '10%',
        backgroundColor    : colorScheme.oxford_blue,
        height             : '100%'
    },

    image: {
        width               : (width/100) * 60,
        height              : pRatio > 2 && Platform.OS === 'ios' ? (height/100)*30 : (height/100) * 35,  // iPhone X
        marginTop           : pRatio * 10,
        marginLeft          : (width/100) * 10,
        marginBottom        : (height/100) *5
    },

    input: {
        backgroundColor     : '#fff',
        height              : (height/100) * 8,
        textAlign           : 'left',
        margin              : '5%',
        paddingLeft         : (width/100) * 5,
        fontSize            : (height/100) * 3,
    },

    placeholderLogin: {
        height              : pRatio * 2
    },

    switcher: {
        flexDirection       : 'row',

        ...Platform.select({

            ios: {
                justifyContent: 'space-between',
                marginLeft  : (width/100) * 4,
                marginRight : '15%',
            },
            android: {
                marginLeft  : '5%',
                marginTop   : '-3%',
            }

        }),
        alignItems          : 'flex-start'
    },

    checkText: {
    },

    submitBtn: {
        backgroundColor     : colorScheme.persian_green,
        borderRadius        : 10,
        height              : pRatio * 20,
        marginHorizontal    : '23%',
        marginTop           : 30,
        justifyContent      : 'center'
    },

    submitText: {
        color               : 'white',
        textAlign           : 'center',
        fontSize            : (height/100) * 3.5,
    }
});
