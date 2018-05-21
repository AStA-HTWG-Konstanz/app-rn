import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    NewsFrame: {
        marginTop       : pixelratio * 10,
        marginLeft      : pixelratio * 10,
        marginRight     : pixelratio * 10,
        marginBottom    : pixelratio * 10,
    },
    newsPanelHeader : {
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    newsPanelHeaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*10
    },
    headerView: {
        backgroundColor : 'white',
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*5
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
