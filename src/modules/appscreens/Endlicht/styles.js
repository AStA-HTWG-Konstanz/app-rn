import { Dimensions, StyleSheet } from 'react-native';
import { pRatio, colorScheme } from 'src/config/styles';


const {height, width} = Dimensions.get('window');
export const style = StyleSheet.create({
    endlichtFrame: {
        marginTop       : pRatio*10,
        marginLeft      : pRatio*10,
        marginRight     : pRatio*10,
        marginBottom    : pRatio*10
    },
    contentContainer: {
        //backgroundColor : colorScheme.botticelli,
        //height          : '100%'
    },
    content: {
        marginTop       : pRatio*5
    },
    page: {
        backgroundColor : 'white'
    },
    special: {
        marginLeft      : pRatio*5,
        marginRight     : pRatio*5,
        marginBottom    : pRatio*5
    },
    header: {
        fontWeight      : 'bold',
        fontSize        : 20
    },
    rowContent: {
        fontSize        : 16,
        flexDirection   : 'row',
        justifyContent  : 'space-between',
        marginRight     : pRatio*50,
        marginTop       : pRatio*5
    },
    menu: {
        marginLeft      : pRatio*5,
        marginRight     : pRatio*5,
        marginBottom    : pRatio*5
    },
    addContent: {
        fontSize        : 16,
        marginRight     : pRatio*70,
        marginLeft      : pRatio*5,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    locationHeader: {
        marginTop       : pRatio*5,
        marginLeft      : pRatio*5
    },
    openingHeader: {
        marginTop       : pRatio*5,
        marginLeft      : pRatio*5,
        fontWeight      : 'bold',
        fontSize        : 20
    },
    openingContent: {
        marginLeft      : pRatio*5,
        fontSize        : 16
    },
    map: {
        marginLeft      : pRatio*5,
        marginTop       : pRatio*5,
        marginRight     : pRatio*5,
        marginBottom    : pRatio*5,
        justifyContent  : 'center',
        alignItems      : 'center'
    },
    endlichtImage: {
        width           : width*0.85,
        height          : height*0.4
    },
    loadingView : {
        height          : (height / 100) * 8,
        alignItems      : 'center',
    },
    loadingText : {
        fontSize        : 40,
        fontWeight      : 'bold',
    }
})