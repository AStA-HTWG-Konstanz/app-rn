import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { accordionIcon, colorScheme } from 'src/config/styles';


const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    eventFrame: {
        marginTop       : pixelratio * 10,
        marginLeft      : pixelratio * 10,
        marginRight     : pixelratio * 10,
        marginBottom    : pixelratio * 10,
    },
    headerView: {
        backgroundColor : 'white'
    },
    eventPanelHeader : {
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    eventPanelHeaderText : {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*10
    },
    eventPanelContainer : {
        backgroundColor : 'white'
    },
    lineStyle:{
        borderWidth     : 1,
        borderColor     : 'lightgrey',
        marginLeft      : pixelratio*10,
        marginRight     : pixelratio*10,
        marginBottom    : pixelratio*5
    },
    accordionIcon       : accordionIcon,
    iconContainer : {
        marginTop       : pixelratio*5,
        marginRight     : pixelratio*10,
        backgroundColor : 'white',
    },
    eventContent : {
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
    loadingView : {
        height          : (height / 100) * 8,
        alignItems      : 'center',
    },
    loadingText : {
        fontSize        : 40,
        fontWeight      : 'bold',
    }
});
