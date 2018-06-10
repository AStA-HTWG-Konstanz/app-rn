import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { colorScheme, pRatio, widgetContentIcon } from 'src/config/styles';
import { style } from './styles';
import { strings } from 'src/i18n';
import { genericNavBarStyle, getBackButton } from 'src/config/navigation';
import { student_hat } from 'src/images';

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
                    <View style={widgetContentIcon}>
                        <Image
                            source={student_hat}
                            style={{
                                width: pRatio*50,
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


export default connect(mapStateToProps)(GradesWidget);