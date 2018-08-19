// Basic style definitions that are used by multiple components/containers
import React from 'react';
import { Dimensions, Image, Platform, PixelRatio, View } from 'react-native';
import CheckBox from 'react-native-checkbox';
import { setCustomListView, setCustomText, setCustomTextInput, setCustomScrollView } from 'react-native-global-props';
import {checkbox_checked, checkbox_unchecked} from 'src/images';
import { option1, option2, option3, option4, option5, option6 } from 'src/images';

const {height, width} = Dimensions.get('window');
const tmpRatio = PixelRatio.get();
export const pRatio = tmpRatio > 2 ? 2.25 : tmpRatio;  // 3 on iPhone X would be too large


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
    width: 37,
    height: 37
};

// Supposed to be invoked by the entry point to the app -> App.js
// Swiss721 or Blogger Sans are available fonts from our corporate design
export const basicStyleSetup = function() {
    // Text
    setCustomText({
        style: {
            color       : 'black',
            fontFamily  : 'Swiss721',
        }
    });

    // TextInput
    setCustomTextInput({
        style: {
            fontFamily  : 'Swiss721',
        }
    });

    // Scrollview
    setCustomScrollView({
        showsVerticalScrollIndicator: false
    });

    // ListView
    setCustomListView({
        showsVerticalScrollIndicator: false
    });

    // Checkbox
    CheckBox.defaultProps.checkedImage = checkbox_checked;
    CheckBox.defaultProps.uncheckedImage = checkbox_unchecked;
    CheckBox.defaultProps.label = '';
};

export const widgetContentIcon = {
    alignItems      : 'center',
    justifyContent  : 'center',
    marginTop       : pRatio*5
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
            //elevation       : 7,
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

export const widgetTitleText = {
    color           : 'white',
    fontSize        : (width/100) * 5,
    fontWeight      : 'normal'
};

export const highRectangleWidget = {
    height          : (width/100) * 90,
    width           : (width/100) * 42.5,
    marginTop       : (width/100) * 5,
};
export const getBackgroundView = function(content, imageNumber) {
    const resizeMode = 'cover';
    const imageStyle = {
        flex: 1,
        resizeMode,
        height: height,
        width: width
    };
    let img;
    switch (imageNumber) {
        case 1:
            img = <Image style={imageStyle} source={option1} />;
            break;
        case 2:
            img = <Image style={imageStyle} source={option2} />;
            break;
        case 3:
            img = <Image style={imageStyle} source={option3} />;
            break;
        case 4:
            img = <Image style={imageStyle} source={option4} />;
            break;
        case 5:
            img = <Image style={imageStyle} source={option5} />;
            break;
        case 6:
            img = <Image style={imageStyle} source={option6} />;
            break;
        default:
            img = <Image style={imageStyle} source={option5} />;
            break;
    }
    return  (
        <View style={{flex:1, backgroundColor: 'transparent'}}>
            <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}>
            {img}
            </View>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                }}
            >
                {content}
            </View>
        </View>
    )
};
