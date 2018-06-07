import { Dimensions, StyleSheet } from 'react-native';
import { pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    gradeFrame: {
        marginTop       : pRatio * 10,
        marginLeft      : pRatio * 10,
        marginRight     : pRatio * 10,
        marginBottom    : pRatio * 10,
    },
    gradesPanelHeader: {
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    gradesPanelHeaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pRatio*5,
        marginLeft      : pRatio*10
    },
    gradesPanelContainer : {
        backgroundColor : 'white'
    },
    iconContainer : {
        marginTop       : pRatio*5,
        marginRight     : pRatio*10,
        backgroundColor : 'white',
    },
    contentView: {
        backgroundColor : 'white',
        height          : pRatio * 15,
        paddingLeft     : '5%',
        paddingRight    : '5%',
        paddingBottom   : pRatio * 2,
    },
    contentHeaderText: {
        fontSize        : 14,
        fontWeight      : 'bold'
    },
    shortDesc: {
        paddingLeft     : '10%',
        paddingBottom   : '5%'
    },

    rowContent: {
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    rightContent: {
        flexDirection   : 'row',
        justifyContent  : 'space-between',
        width           : '30%'
    },
    leftContent: {
        width           : '70%'
    },
    loadingView : {
        height          : (height / 100) * 8,
        alignItems      : 'center',
    },
    loadingText : {
        fontSize        : 40,
        fontWeight      : 'bold',
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*5
    }

});
