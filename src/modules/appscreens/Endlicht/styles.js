import { Dimensions, Platform, PixelRatio, StyleSheet } from 'react-native';
import { panelIcon, colorScheme } from 'src/config/styles';


const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    contentContainer: {
        backgroundColor : colorScheme.botticelli,
        height          : '100%'
    },
    content: {
        marginTop       : pixelratio*5
    },
    page: {
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*5,
        marginRight     : pixelratio*5,
        backgroundColor : 'white'
    },
    special: {
        marginLeft      : pixelratio*5,
        marginRight     : pixelratio*5,
        marginBottom    : pixelratio*5
    },
    header: {
        fontWeight      : 'bold',
        fontSize        : 20
    },
    rowContent: {
        fontSize        : 16,
        flexDirection   : 'row',
        justifyContent  : 'space-between',
        marginRight     : pixelratio*50,
        marginTop       : pixelratio*5
    },
    menu: {
        marginLeft      : pixelratio*5,
        marginRight     : pixelratio*5,
        marginBottom    : pixelratio*5
    },
    addContent: {
        fontSize        : 16,
        marginRight     : pixelratio*70,
        marginLeft      : pixelratio*5,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    locationHeader: {
        marginTop       : pixelratio*5,
        marginLeft      : pixelratio*5
    },
    map: {
        marginLeft      : pixelratio*5,
        marginTop       : pixelratio*5,
        marginRight     : pixelratio*5,
        marginBottom    : pixelratio*5,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    endlichtImage: {
        width           : width*0.85,
        height          : height*0.4
    }
})