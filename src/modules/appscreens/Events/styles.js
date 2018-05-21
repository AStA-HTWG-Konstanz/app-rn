import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { accordionIcon, colorScheme } from 'src/config/styles';


const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    contentContainer: {
        backgroundColor : colorScheme.botticelli,
        height          : '100%'
    },
    EventFrame: {
        marginTop       : pixelratio * 10,
        marginLeft      : pixelratio * 10,
        marginRight     : pixelratio * 10,
        marginBottom    : pixelratio * 10,
    },
    headerView: {
        backgroundColor : 'white'
    },
    eventPanelHeader : { // View Samstag +
        height          : (height / 100) * 8,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    eventPanelHeaderText : { // Samstag
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
    accordionIcon : accordionIcon,
    iconContainer : { // + bzw. -
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
});
