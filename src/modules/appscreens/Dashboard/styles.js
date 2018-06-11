import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme } from 'src/config/styles';

const {height, width} = Dimensions.get('window');

export const style = StyleSheet.create({
    dashboardFrame: {
        borderWidth         : (width/100) * 5,
        marginTop           : -(width/100) * 5,
        borderColor         : colorScheme.botticelli,
    },
    dashboard: {
            backgroundColor     : colorScheme.botticelli,
    },
    singleWidget: {
        flexDirection       : 'row',
        justifyContent      : 'space-between',
    },
    singleWidget2: {
        flexDirection       : 'column',
    },
});
