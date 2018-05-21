import { Dimensions, PixelRatio, StyleSheet } from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');
const pixelratio = PixelRatio.get();

export const style = StyleSheet.create({
    gradeFrame: {
        marginTop       : pixelratio * 10,
        marginLeft      : pixelratio * 10,
        marginRight     : pixelratio * 10,
        marginBottom    : pixelratio * 10,
    },
    gradesPanelHeader: {
        height          : (height / 100) * 7,
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    headerView: {
        backgroundColor : 'white',
    },
    gradesPanelHeaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : '5%',
        marginLeft      : '5%'
    },
    iconContainer: {
        marginTop       : '4%',
        marginRight     : '5%'
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
        paddingBottom   : '5%',
    },
    rowContent: {
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    rightContent: {
        flexDirection   : 'row',
        justifyContent  : 'space-between',
        width           : '30%'
    },
    leftContent: {
        width           : '70%'
    },
    contentHeaderText: {
        fontSize        : 14,
        fontWeight      : 'bold'
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
