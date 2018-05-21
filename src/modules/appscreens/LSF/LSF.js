import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as LSFActions from 'src/actions/lectureActions';
import Panel from 'src/modules/Panel';
import { strings } from 'src/i18n';
import { style } from './styles';
import { panelIcon } from 'src/config/styles';
import { getBackgroundView } from 'src/config/styles';

class LSF extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        let content;
        if (this.props.lectures) {
            content = this._renderView();
        } else {
            content =   <View>
                            <Text style={{fontSize: 24}}>{strings("LSF.emptyTxt")}</Text>
                            <Text>{strings("LSF.selectLecture")}</Text>
                        </View>
        }

        return content;
    }

    _renderView() {
        const content = (
            <ScrollView style={style.lsfFrame}>
                <View>
                    <FlatList
                        data={this.props.lectures}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => 'panel' + index}
                    />
                </View>
            </ScrollView>
        );
        return getBackgroundView(content, 3);
    }

    _renderItem = (listLectures) => {

        const  panelHeader = ({isOpen}) => {
            return (
                <View style={style.headerView}>
                    <View style={style.LSFpanelHeader}>
                        <Text style={style.LSFheaderText}>
                            {moment(listLectures.item['date'], 'YYYY-MM-DD').format('dddd')}
                        </Text>
                        <View style={style.iconContainer}>
                            <Icon
                                name={isOpen ? 'remove' : 'add'}
                                size={panelIcon.size}
                                color={panelIcon.color}
                            />
                        </View>
                    </View>
                    <View style = {style.lineStyle}/>
                </View>
            );
        };

        const panelContent = (
            <FlatList
                data={listLectures.item['lectures']}
                renderItem={this._renderLectures}
                listKey={'Lecture_' + listLectures.index}
                keyExtractor={(item, index) => 'lecture_' + index}
            />
        );

        return (
            <View style={style.lectureContent}>
                <Panel
                    expanded={false}
                    header={panelHeader}
                    content={panelContent}
                />
            </View>

        )
    };

    _renderLectures = (lecture) => {
        return (
            <View style={style.bodyView}>
                <View>
                    <Text style={style.titleText}>{lecture.item['name']}</Text>
                </View>
                <View style={style.contentBody}>
                    <View style={style.lectureTime}>
                        <Text>{lecture.item['startTime']}</Text>
                        <Text> - </Text>
                        <Text>{lecture.item['endTime']}</Text>
                    </View>
                    <Text>{lecture.item['room']}</Text>
                    <Text>{lecture.item['category']}</Text>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    lectures: state.lectureReducer.lectures
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(LSFActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LSF);