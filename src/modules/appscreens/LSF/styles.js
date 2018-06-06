import { Dimensions, StyleSheet } from 'react-native';
import { pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');
export const style = StyleSheet.create({
    lsfFrame: {
        marginTop       : pRatio*10,
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*10
    },
    headerView: {
        backgroundColor : 'white'
    },
    LSFpanelHeader: {
        height          : (height / 100) * 7,
        flexDirection   : 'row',
        justifyContent  : 'space-between',
        backgroundColor : 'white'
    },
    LSFheaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pRatio*7,
        marginLeft      : pRatio*10
    },
    iconContainer: {
        marginTop       : pRatio*5,
        marginRight     : pRatio*10
    },
    lectureContent: {
        backgroundColor : 'white',
    },
    lectureTime: {
        flexDirection   : 'row',
    },
    bodyView: {
        marginLeft      : pRatio*10,
        marginBottom    : pRatio*3
    },
    contentBody: {
        marginTop       : pRatio*2
    },
    titleText: {
        fontWeight      : 'bold',
        fontSize        : 16
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*5
    },
});