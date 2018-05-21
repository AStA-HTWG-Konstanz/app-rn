'use strict';

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PropTypes = require('prop-types');

import { strings } from 'src/i18n';
import { widgetEnumKeys } from 'src/config/settings';
import { iconStyle, styles } from './styles';


const listMode = {
    ADD     : 0,
    DELETE  : 1
};

const direction = {
    UP      : 0,
    DOWN    : 1
};

export default class SelectList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        this._splitList();

        const selectedElements = this.selectedKeys.map((value, index) => {
            return this._renderRow(value, index, listMode.DELETE);
        });

        const availableElements = this.available.map((value, index) => {
            return this._renderRow(value, index, listMode.ADD);
        });

        return (
            <View style={styles.container}>
                <Text style={styles.widgetGroupTitle}>
                    {strings('settings.selectedWidgetsHeader')}
                </Text>

                {selectedElements}

                <View style={styles.placeholder}/>

                <Text style={styles.widgetGroupTitle}>
                    {strings('settings.availableWidgetsHeader')}
                </Text>
                {availableElements}
            </View>
        );
    }

    _splitList() {
        this.selectedKeys = Object.assign([], this.props.selectedKeys);  // deep copy
        const allKeys = this.props.allKeys;
        this.available = [];

        for (let i = 0; i < allKeys.length; i++) {
            if (!this.selectedKeys.includes(allKeys[i])) {
                this.available.push(allKeys[i]);
            }
        }

    }

    _renderRow(value, index, mode) {
        let rowGroups = [];
        rowGroups.push(
            <View style={styles.rowContentGroup}>
                <Icon
                    name={mode === listMode.ADD ? 'add-circle' : 'remove-circle'}
                    size={iconStyle.size}
                    color={mode === listMode.ADD ? iconStyle.colorAvailable : iconStyle.colorSelected}
                    onPress={() => this._onChangeMode(index, mode)}
                />
                <Text style={styles.rowTitle}>
                    {strings('settings.' + widgetEnumKeys[value])}
                </Text>
            </View>
        );

        if (mode === listMode.DELETE) {
            let icons = [];
            const iconUp = this._getArrowIcon('keyboard-arrow-up', index, direction.UP);
            const iconDown = this._getArrowIcon('keyboard-arrow-down', index, direction.DOWN);

            if (index === 0) {  // moving upwards not possible
                icons.push(iconDown);
            } else if (index === this.selectedKeys.length - 1) {  // moving downwards not possible
                icons.push(iconUp);
                icons.push(<Icon name='keyboard-arrow-down' size={iconStyle.size} color={'transparent'}/>);
            } else {  // normal row
                icons.push(iconUp, iconDown);
            }
            rowGroups.push(
                <View style={styles.rowContentGroup}>
                    {icons}
                </View>
            );
        }

        return (
            <View style={styles.rowContainer}>
                {rowGroups}
            </View>
        );
    }

    _onMoveRow(movementDirection, index) {
        // Reorder selected List
        if (movementDirection === direction.UP) {
            arrayMove(this.selectedKeys, index, index - 1);
        } else {
            arrayMove(this.selectedKeys, index, index + 1);
        }

        // Propagate new selection
        this.props.onChangeOrder(this.selectedKeys);
    }

    _onChangeMode(index, currentMode) {
        if (currentMode === listMode.ADD) {
            this.selectedKeys.push(this.available[index]);
            this.props.onChangeOrder(this.selectedKeys);
        } else {
            this.selectedKeys.splice(index, 1);  // 1 -> remove one element
            this.props.onChangeOrder(this.selectedKeys);
        }
    }

    _getArrowIcon(name, index, movementDirection) {
        return (
            <Icon
                name={name}
                size={iconStyle.size}
                color={iconStyle.colorSelected}
                onPress={() => this._onMoveRow(movementDirection, index)}
            />
        );
    }
}

const arrayMove = function(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
};

SelectList.propTypes = {
    allKeys         : PropTypes.array,
    onChangeOrder   : PropTypes.func,
    selectedKeys    : PropTypes.array
};
