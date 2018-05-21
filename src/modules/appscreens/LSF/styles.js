import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();


export const style = StyleSheet.create({
    allAround: {
        backgroundColor : colorScheme.botticelli,
        paddingHorizontal: pixelratio*5,
        paddingTop      : pixelratio*5,
        flex            : 1
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
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*10
    },
    iconContainer: {
        marginTop       : pixelratio*5,
        marginRight     : pixelratio*10
    },
    lectureContent: {
        backgroundColor : 'white',
    },
    lectureTime: {
        flexDirection   : 'row',
    },
    bodyView: {
        marginLeft      : pixelratio*10,
        marginBottom    : pixelratio*3
    },
    contentBody: {
        marginTop       : pixelratio*2
    },
    titleText: {
        fontWeight      : 'bold',
        fontSize        : 16
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*5
    },
});