import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { colorScheme } from 'src/config/styles';
import { genericNavBarStyle, getBackButton } from 'src/config/navigation';

class EventWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                <TouchableOpacity onPress={() => {
                    navigator.push({
                        screen: 'app.Events',
                        title: strings('events.screenTitle'),
                        backButtonTitle: '',
                        navigatorButtons: getBackButton(navigator),
                        navigatorStyle: Object.assign({}, genericNavBarStyle, {
                            navBarBackgroundColor: colorScheme.botticelli,
                            navBarTextColor: 'black'
                        })
                    });
                }}>
                <View style={style.titleView}>
                    <Text style={style.titleText}>
                        HTWG
                    </Text>
                </View>
                <View style={style.contentView}>
                    <Text style={style.contentText}>
                        {strings('dashboard.contentEvent')}
                    </Text>
                </View>
                <View style={style.contentView}>
                    <Text style={style.titleText}>
                        SoSe18
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    //TODO: reducer
});


export default connect(mapStateToProps)(EventWidget);