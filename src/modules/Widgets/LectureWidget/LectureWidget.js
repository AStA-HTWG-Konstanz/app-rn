import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Navigation } from 'react-native-navigation';

import { style } from './styles';
import { strings } from 'src/i18n';
import { getTopBarOptions } from 'src/config/navigation';

class LectureWidget extends Component {
    constructor(props) {
        super(props);
    }

    // Iterate over lectures until one element is in the future -> next lecture found
    _getNextLecture() {
        const days = this.props.lectures;
        const now = moment();
        for (let i = 0; i < this.props.lectures.length; i++) {
            const day = this.props.lectures[i];
            // Check if day is today or after today
            const dayMoment = moment(day['date'], 'YYYY-MM-DD');
            if (dayMoment.isSame(now, 'day') || dayMoment.isAfter(now, 'day')) {
                for (let k = 0; k < day['lectures'].length; k++) {
                    let lecture = day['lectures'][k];
                    // Concatenate day and time
                    const startMoment = moment(day['date'] + '::' + lecture['startTime'], 'YYYY-MM-DD::HH:mm:SS');
                    if (now.isBefore(startMoment)) {
                        // Next lecture found
                        let ret = Object.assign({}, lecture);
                        ret['startTime'] = moment(day['date'] + '::' + lecture['startTime'], 'YYYY-MM-DD::HH:mm:SS');
                        return ret;
                    }
                }
            }
        }
    }

    render() {

        let title, time, room;
        if (this.props.lectures) {
            const lecture = this._getNextLecture();
            if (lecture) {  // could also be undefined if next lecture doesn't exist
                title = lecture['name'];
                time = lecture['startTime'].format('dd HH:mm');
                room = lecture['room'];
            } else {
                title = strings("dashboard.titleLectures");
                time = strings("dashboard.noLectureTxt");
            }
        } else {
            title = strings("dashboard.titleLectures");
            time = strings("general.noDataTxt");
        }

        const {componentId} = this.props;
        return  (
            <TouchableOpacity onPress={() => {
                Navigation.push(componentId, {
                    component: {
                        id: 'idLSF',
                        name: 'app.LSF',
                        options: getTopBarOptions(strings('LSF.screenTitle'), false, true, 'idLSF')
                    }
                });
            }}>
                <View style={style.widgetContainer}>
                        <View style={style.titleView}>
                            <Text style={style.titleText}>
                                {title}
                            </Text>
                        </View>
                        <View style={style.contentView}>
                            <Text style={style.contentText}>
                                {time}
                            </Text>
                        </View>
                        <View style={style.contentView}>
                            <Text style={style.titleText}>
                                {room}
                            </Text>
                        </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({
    lectures: state.lectureReducer.lectures
});


export default connect(mapStateToProps, null, null, {"withRef" : true})(LectureWidget);