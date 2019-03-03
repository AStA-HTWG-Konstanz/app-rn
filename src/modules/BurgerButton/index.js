import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {ic_burger} from 'src/images';
import {Navigation} from 'react-native-navigation';

const styles = StyleSheet.create({
    button: {
        overflow        : 'hidden',
        justifyContent  : 'center',
        alignItems      : 'center',
    },
    image: {
        width: 30,
        height: 30
    }
});


export default class BurgerButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => Navigation.mergeOptions(this.props.screenId,
                    {
                        sideMenu: {
                            left: {
                                visible: true
                            }
                        }
                    })
                }
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
