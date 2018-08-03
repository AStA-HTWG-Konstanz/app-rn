import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import { ic_back } from 'src/images';
import { navBarButton } from 'src/config/styles';


const styles = StyleSheet.create({
    button: {
        overflow        : 'hidden',
        justifyContent  : 'center',
        alignItems      : 'center',
    },
    image: navBarButton
});


export default class BackButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => Navigation.pop(this.props.screenId)}
            >
                <View style={styles.button}>
                    <Image
                        source={ic_back}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}