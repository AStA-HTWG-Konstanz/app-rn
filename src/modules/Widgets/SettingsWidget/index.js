import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {pRatio, squareWidget, widgetShadow} from 'src/config/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';


export class SettingsWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigator.toggleDrawer({
                            side: 'left',
                            animated: true,
                            to: 'open'
                        })
                    }}
                >
                    <Icon
                        name={'add'}
                        color={'white'}
                        size={pRatio * 60}
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
