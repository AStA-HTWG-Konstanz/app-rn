import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { colorScheme, pRatio, widgetContentIcon } from 'src/config/styles';
import { genericNavBarStyle, getBackButton } from 'src/config/navigation';
import { calendar } from 'src/images';

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
                        {strings('events.screenTitle')}
                    </Text>
                </View>
                <View style={widgetContentIcon}>
                    <Image
                        source={calendar}
                        style={{
                            width: pRatio*40,
                            height: pRatio*30
                        }}
                    />
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