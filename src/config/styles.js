// Basic style definitions that are used by multiple components/containers
import { Dimensions, Platform, PixelRatio, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-checkbox';
import {checkbox_checked, checkbox_unchecked} from 'src/images';

const {height, width} = Dimensions.get('window');
const pRatio = PixelRatio.get();


export const colorScheme = {
    oxford_blue         : '#334152',
    botticelli          : '#d9e5ec',
    blue_stone_light    : '#006060',
    blue_stone_dark     : '#006567',
    persian_green       : '#009B91',
    circleActive        : '#30a566',
    circleInActive      : '#000000',
    limegreen           : '#32CD32',
    grey                : '#808080'
};

export const panelIcon = {
    size    : 36,
    color   : colorScheme.persian_green
};

export const navBarButton = {
    width: 40,
    height: 40
};

// Supposed to be invoked by the entry point to the app -> App.js
// Swiss721 or Blogger Sans are available fonts from our corporate design
export const basicStyleSetup = function() {
    // Text
    Text.defaultProps.style = {
        color       : 'black',  // colorScheme.botticelli
        fontFamily  : 'Swiss721'
    };

    // TextInput
    TextInput.defaultProps.style = {
        fontFamily  : 'Swiss721'
    };

    // Checkbox
    CheckBox.defaultProps.checkedImage = checkbox_checked;
    CheckBox.defaultProps.uncheckedImage = checkbox_unchecked;
    CheckBox.defaultProps.label = '';
};

export const widgetShadow = {
    ...Platform.select({
        ios: {
            shadowOffset    : { width: 5, height: 5 },
            shadowColor     : colorScheme.grey,
            shadowOpacity   : 2,
            zIndex          : 100
        },
        android: {
            elevation       : 7,
        }
    }),
};

export const squareWidget = {
    height          : (width/100) * 42.5,
    width           : (width/100) * 42.5,
    marginTop       : (width/100) * 5,
};

export const wideRectangleWidget = {
    height          : (width/100) * 42.5,
    width           : (width/100) * 90,
    marginTop       : (width/100) * 5,
};
    export const highRectangleWidget = {
    height          : (width/100) * 90,
    width           : (width/100) * 42.5,
    marginTop       : (width/100) * 5,
};
