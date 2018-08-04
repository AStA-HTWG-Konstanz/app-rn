import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { pRatio, widgetContentIcon } from 'src/config/styles';
import { style } from './styles';
import { strings } from 'src/i18n';
import { getTopBarOptions } from 'src/config/navigation';
import { student_hat } from 'src/images';
import { Navigation } from 'react-native-navigation';

class GradesWidget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {componentId} = this.props;
        return  (
            <TouchableOpacity onPress={() => {
                Navigation.push(componentId, {
                    component: {
                        id: 'idGrades',
                        name: 'app.Grades',
                        options: getTopBarOptions(strings('grades.screenTitle'), false, true, 'idGrades')
                    }
                });
            }}>
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                {strings('grades.widgetTitle')}
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


export default connect(mapStateToProps, null, null, {"withRef" : true})(GradesWidget);