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
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                {strings('grades.title')}
                            </Text>
                        </View>
                        <View style={Object.assign({}, widgetContentIcon, {marginTop: pRatio*9})}>
                            <Image
                                source={student_hat}
                                style={{
                                    width: pRatio*40,
                                    height: pRatio*24
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


export default connect(mapStateToProps)(GradesWidget);