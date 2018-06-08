import React, { Component } from 'react';
import { Platform, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorScheme, pRatio } from 'src/config/styles';
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
                        navigatorButtons: getBackButton(navigator),
                        navigatorStyle: Object.assign({}, genericNavBarStyle, {
                            navBarBackgroundColor: colorScheme.botticelli,
                            navBarTextColor: 'black'
                        })
                    })
                }}>
                    <View style={style.titleView}>
                        <Text style={style.titleText}>
                            {strings('grades.title')}
                        </Text>
                    </View>
                    <View style={style.graduationIcon}>
                        <Icon
                            name='graduation-cap'
                            color='white'
                            size={Platform.OS === 'ios' ? pRatio * 30 : pRatio * 25}
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


export default connect(mapStateToProps)(GradesWidget);