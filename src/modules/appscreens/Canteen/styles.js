import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { colorScheme } from 'src/config/styles';


const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    contentContainer: {
        backgroundColor : colorScheme.botticelli,
        height          : '100%'
    },
    CanteenFrame: {
        marginTop       : pixelratio*10,
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*10
    },
    headerView: {
        backgroundColor : 'white'
    },
    menuPanelHeader : {
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    menuPanelHeaderText : {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*10
    },
    menuPanelContainer : {
        backgroundColor : 'white'
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*5
    },
    iconContainer : {
        marginTop       : pixelratio*5,
        marginRight     : pixelratio*10,
        backgroundColor : 'white',
    },
    menuContent : {
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*5
    },

    title : {
        fontWeight      : 'bold',
        fontSize        : 16,
    },
    content : {
        fontSize        : 14,
    },
});
