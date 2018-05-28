import { Dimensions, StyleSheet } from 'react-native';
import { pRatio } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    NewsFrame: {
        marginTop       : pRatio * 10,
        marginLeft      : pRatio * 10,
        marginRight     : pRatio * 10,
        marginBottom    : pRatio * 10,
    },
    newsPanelHeader : {
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    newsPanelHeaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pRatio*5,
        marginLeft      : pRatio*10
    },
    headerView: {
        backgroundColor : 'white',
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*5
    },
    iconContainer: {
        marginTop       : '10%',
        marginRight     : '10%'
    },
    listView: {
        marginTop       : '10%',
    },
    shortDesc: {
        paddingLeft     : '10%',
        paddingBottom   : '5%'
    },
    contentView: {
        backgroundColor : 'white',
        paddingLeft     : '5%',
        paddingRight    : '5%',
        paddingBottom   : '5%'
    },
});
