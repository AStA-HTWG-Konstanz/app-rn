import React, { Component } from 'react';
import {PixelRatio, StyleSheet, TouchableOpacity, View} from 'react-native';
import {squareWidget, widgetShadow} from 'src/config/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';


const pixelRatio = PixelRatio.get();
export class SettingsWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                <TouchableOpacity
                    onPress={() => navigator.toggleDrawer({
                        side: 'left',
                        animated: true,
                        to: 'missing'  // missing = the opposite of current state
                    })}
                >
                    <Icon
                        name={'add'}
                        color={'white'}
                        size={pixelRatio * 70}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    widgetContainer : Object.assign({}, widgetShadow, squareWidget, {
        borderWidth     : 0.3,
        borderColor     : 'lightgrey',
        backgroundColor : 'rgba(195, 203, 209, 0.5)',
        alignItems      : 'center',
        justifyContent  : 'center'
    }),
});
