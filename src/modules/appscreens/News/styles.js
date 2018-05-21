import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    allAround: {
        backgroundColor : colorScheme.botticelli,
        height          : '100%'
    },
    page: {
        paddingLeft     : '5%',
        paddingRight    : '5%',
    },
    newsPanelHeader: {
        height          : (height / 100) * 7,
        width           : '100%',
        marginLeft      : '5%',
        marginRight     : '5%',
        flexDirection   : 'row',
        justifyContent  : 'space-between'
    },
    headerView: {
        backgroundColor : 'white',
    },
    newsPanelHeaderText: {
        fontSize        : 20,
        fontWeight      : 'bold',
        marginTop       : '5%',
        marginLeft      : '5%'
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
    contentText: {

    },
    separator: {
        height              : (height / 100) * 0.2,
        backgroundColor     : 'grey',
        alignItems          : 'center'
    }
});
