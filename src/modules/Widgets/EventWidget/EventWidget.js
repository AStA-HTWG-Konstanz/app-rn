import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { pRatio, widgetContentIcon } from 'src/config/styles';
import { getTopBarOptions } from 'src/config/navigation';
import { calendar } from 'src/images';
import { Navigation } from 'react-native-navigation';

class EventWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {componentId} = this.props;
        return  (
            <TouchableOpacity onPress={() => {
                Navigation.push(componentId, {
                    component: {
                        id: 'idEvents',
                        name: 'app.Events',
                        options: getTopBarOptions(strings('events.screenTitle'), false, true)
                    }
                });
            }}>
                <View style={style.widgetContainer}>
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
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({
    //TODO: reducer
});


export default connect(mapStateToProps)(EventWidget);