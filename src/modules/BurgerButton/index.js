import React, {Component} from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import { ic_burger } from 'src/images';
import { navBarButton } from 'src/config/styles';

const styles = StyleSheet.create({
    button: {
        overflow        : 'hidden',
        justifyContent  : 'center',
        alignItems      : 'center',
    },
    image: navBarButton
});


export default class BurgerButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.passedNavigator.toggleDrawer({
                    side: 'left',
                    animated: true,
                    to: 'missing'  // missing = the opposite of current state
                })}
            >
                <View style={styles.button}>
                    <Image
                        source={ic_burger}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}
