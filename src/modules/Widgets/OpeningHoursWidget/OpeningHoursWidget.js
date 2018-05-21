import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import {
    View,
    Text
} from 'react-native';

class OpeningHoursWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let open, close;
        if (this.props.openingHours) {
            open = this.props.openingHours[0]["open"];
            close = this.props.openingHours[0]["close"];
        }

        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                    <View style={style.titleView}>
                        <Text style={style.titleText}>
                            BIB
                        </Text>
                    </View>
                    <View style={style.contentView}>
                        <Text style={style.contentText}>
                            {open}
                        </Text>
                    </View>
                    <View style={style.contentView}>
                        <Text style={style.contentText}>
                            {close}
                        </Text>
                    </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    openingHours: state.openingHoursReducer.openingHours
});


export default connect(mapStateToProps)(OpeningHoursWidget);