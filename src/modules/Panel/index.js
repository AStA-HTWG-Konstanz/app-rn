'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    Platform,
    Animated
} from 'react-native';

const propTypes = {
    activeOpacity: PropTypes.number,
    animationDuration: PropTypes.number,
    content: PropTypes.element.isRequired,
    easing: PropTypes.string,
    expanded: PropTypes.bool,
    header: PropTypes.func.isRequired,
    onPress: PropTypes.func,
    underlayColor: PropTypes.string,
    style: PropTypes.object
};

const defaultProps = {
    activeOpacity: 1,
    animationDuration: 300,
    easing: 'linear',
    expanded: false,
    underlayColor: '#f1f1f1',
    style: {}
};

class Panel extends Component {
    state = {
        is_visible: this.props.expanded,
        height: new Animated.Value(0),
        content_height: 0
    };

    componentDidMount() {
        if (Platform.OS === 'android') {
            setTimeout(this._getContentHeight);
        }
    }

    close = () => {
        this.state.is_visible && this.toggle();
    };

    open = () => {
        !this.state.is_visible && this.toggle();
    };

    toggle = () => {
        this.setState({ is_visible: !this.state.is_visible });

        Animated.timing(
            this.state.height,
            {
                toValue: this.state.height._value === 0 ? this.state.content_height : 0,
                duration: this.props.animationDuration,
            }
        ).start();
    };

    _onPress = () => {
        this.toggle();

        if (this.props.onPress) {
            this.props.onPress.call(this);
        }
    };

    _getContentHeight = (event) => {
        if (this.refs.PanelContent) {
            this.refs.PanelContent.measure((ox, oy, width, height, px, py) => {
                if (event) {  // ios part
                    if (!(this.initialHeight)) {
                        this.initialHeight = height;
                    }
                    this.setState({
                        height: new Animated.Value(this.props.expanded ? this.initialHeight : 0),
                        content_height: this.initialHeight
                    });
                } else {  // android part
                    this.setState({
                        height: new Animated.Value(this.props.expanded ? height : 0),
                        content_height: height
                    });
                }

            });
        }
    };

    render() {
        let contentView;
        if (Platform.OS === 'ios') {
            contentView = <View ref="PanelContent" onLayout={this._getContentHeight.bind(this)}>
                {(Platform.OS === 'ios' || this.state.is_visible) ? this.props.content : null}
            </View>
        } else {
            contentView = <View ref="PanelContent">
                {(Platform.OS === 'ios' || this.state.is_visible) ? this.props.content : null}
            </View>
        }
        return (
            <View
                style={{
                    overflow: 'hidden'
                }}
            >
                <TouchableHighlight
                    ref="PanelHeader"
                    onPress={this._onPress}
                    underlayColor={this.props.underlayColor}
                    style={this.props.style}
                >
                    {this.props.header({ isOpen: this.state.is_visible })}
                </TouchableHighlight>
                <Animated.View
                    ref="PanelContentWrapper"
                    style={{
                        height: this.state.height,
                        overflow: 'scroll'
                    }}
                >
                    {contentView}
                </Animated.View>
            </View>
        );
    }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;

export default Panel;
