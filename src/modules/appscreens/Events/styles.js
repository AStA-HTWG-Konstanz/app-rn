import { Dimensions, StyleSheet } from 'react-native';
import { pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    eventFrame: {
        marginTop       : pRatio * 10,
        marginLeft      : pRatio * 10,
        marginRight     : pRatio * 10,
        marginBottom    : pRatio * 10,
    },
    eventPanelContainer : {
        backgroundColor : 'white'
    },
    headerView: {
        backgroundColor : 'white',
        marginBottom    : pRatio * 5
    },
    headerText : {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pRatio*5,
        marginLeft      : pRatio*10
    },
    eventContent : {
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*5
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*5
    },
    title : {
        fontWeight      : 'bold',
        fontSize        : 16,
    },
    content : {
        fontSize        : 14,
    },
    loadingView : {
        height          : (height / 100) * 8,
        alignItems      : 'center',
    },
    loadingText : {
        fontSize        : 40,
        fontWeight      : 'bold',
    },
});
