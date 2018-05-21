import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { style } from './styles';
import { strings } from 'src/i18n';
import { genericNavBarStyle, getBackButton } from 'src/config/navigation';

class GradesWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigator} = this.props;
        return  (
            <View style={style.widgetContainer}>
                <TouchableOpacity onPress={() => {
                    navigator.push({
                        screen: 'app.Grades',
                        title: strings('grades.title'),
                        backButtonTitle: '',
                        navigatorButtons: getBackButton(navigator)
                    })
                }}>
                    <View style={style.titleView}>
                        <Text style={style.titleText}>
                            {strings('grades.title')}
                        </Text>
                    </View>
                    <View style={style.contentView}>
                        <Text style={style.contentText}>
                            2,3
                        </Text>
                    </View>
                    <View style={style.contentView}>
                        <Text style={style.titleText}>
                            SoSe 18
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


export default connect(mapStateToProps)(GradesWidget);